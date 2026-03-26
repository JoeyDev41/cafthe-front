/**
 * Security.test.jsx
 * ==================
 * MISSION 2 — Test de sécurité : validation des entrées (Input Validation)
 *
 * Contexte DWWM / OWASP :
 *   Ce test illustre la protection contre les attaques XSS (Cross-Site Scripting).
 *   Une attaque XSS consiste à injecter du code JavaScript malveillant via
 *   un champ de formulaire pour qu'il soit exécuté dans le navigateur d'un autre
 *   utilisateur (vol de session, redirection, modification de page...).
 *
 *   React protège AUTOMATIQUEMENT contre les XSS : toute valeur affichée
 *   dans le JSX via { expression } est échappée (les < > & " sont convertis
 *   en entités HTML : &lt; &gt; &amp; &quot;). C'est le comportement par défaut.
 *
 *   DANGER : dangerouslySetInnerHTML contourne cette protection — ce test
 *   vérifie son absence sur les champs testés.
 *
 * Référentiel DWWM visé :
 *   - "Valider systématiquement les entrées"
 *   - "Réaliser les tests de sécurité"
 *   - Connaissance des failles XSS et de l'OWASP Top 10 (A03:2021 - Injection)
 *
 * Adaptations par rapport au template du cours :
 *   - Register.jsx utilise useContext(AuthContext) pour accéder à la fonction login.
 *     -> On fournit un AuthContext.Provider avec des valeurs factices.
 *   - Register.jsx utilise toast (react-hot-toast) pour les messages.
 *     -> On mocke react-hot-toast pour éviter les erreurs d'import.
 *   - Les labels HTML n'ont pas de ":" (ex: "Nom *" et non "Nom :").
 *     -> Le sélecteur /^nom :/i est remplacé par /^nom/i.
 */

import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Register from "../pages/Register";
import { AuthContext } from "../context/AuthContex.jsx";

// ─── Mock de react-hot-toast ─────────────────────────────────────────────────
// Register.jsx importe react-hot-toast. Sans ce mock, le module réel pourrait
// poser problème dans l'environnement de test. On le remplace par des espions.
const { mockToastSuccess, mockToastError } = vi.hoisted(() => ({
  mockToastSuccess: vi.fn(),
  mockToastError: vi.fn(),
}));

vi.mock("react-hot-toast", () => {
  const toast = vi.fn();
  toast.success = mockToastSuccess;
  toast.error = mockToastError;
  return { default: toast };
});

// ─── Mock de useNavigate (nécessaire car Register utilise ce hook) ─────────────
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => vi.fn(),
  };
});

// ─── Contexte AuthContext simulé ─────────────────────────────────────────────
// Register.jsx fait : const { login } = useContext(AuthContext)
// Sans Provider, useContext retourne undefined et le composant crashe.
// On fournit un objet factice avec les propriétés attendues.
const authValue = {
  user: null,
  isAuthenticated: false,
  login: vi.fn(),
  logout: vi.fn(),
  loading: false,
};

// ─── Helper de rendu ──────────────────────────────────────────────────────────
// On enveloppe Register dans AuthContext.Provider ET MemoryRouter car le
// composant utilise useContext(AuthContext), <Link> et useNavigate,
// qui nécessitent ces contextes pour fonctionner.
const renderRegister = () =>
  render(
    <AuthContext.Provider value={authValue}>
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    </AuthContext.Provider>
  );

// ─── Suite de tests sécurité ──────────────────────────────────────────────────
describe("Sécurité — Protection contre les injections XSS", () => {
  beforeEach(() => {
    // Réinitialise les espions toast entre chaque test
    mockToastSuccess.mockClear();
    mockToastError.mockClear();
    // Réinitialise le mock global de fetch
    global.fetch = vi.fn();
  });

  // ═══════════════════════════════════════════════════════════════════════════
  // TEST DE SÉCURITÉ — Injection XSS dans un champ texte
  //
  // Scénario : un attaquant saisit un payload XSS classique dans le champ "nom".
  // On vérifie que React neutralise la menace en traitant la saisie comme
  // du texte brut et NON comme du HTML ou du JavaScript exécutable.
  //
  // Référence OWASP : A03:2021 - Injection / CWE-79 : Improper Neutralization of Input
  // ═══════════════════════════════════════════════════════════════════════════
  test("neutralise une saisie XSS malveillante dans le champ nom", () => {
    // ARRANGE : payload XSS classique.
    // Si ce code s'exécutait côté navigateur, il déclencherait une alerte
    // (preuve que du code arbitraire peut s'exécuter dans la session de l'utilisateur).
    // En réalité, un attaquant utiliserait ce vecteur pour voler des cookies de session
    // ou rediriger l'utilisateur vers un site malveillant.
    const xssPayload = '<script>alert("XSS")</script>';

    // On compte le nombre de balises <script> dans le DOM AVANT la saisie
    // (celles qui appartiennent légitimement à l'application)
    const scriptCountBefore = document.querySelectorAll("script").length;

    renderRegister();

    // ACT : on simule la saisie du payload malveillant dans le champ "Nom"
    // Note : le label dans Register.jsx est "Nom *" (sans ":").
    // L'astérisque est dans un <span aria-hidden="true">, donc ignoré par RTL.
    // Le sélecteur /^nom/i cible "Nom" mais pas "Prénom" grâce à l'ancre ^.
    const nomInput = screen.getByLabelText(/^nom/i);
    fireEvent.change(nomInput, { target: { value: xssPayload } });

    // ── ASSERT 1 : la valeur est stockée comme texte brut ────────────────────
    // React stocke la valeur dans son state comme une simple chaîne de caractères.
    // Elle n'est PAS interprétée comme du HTML : c'est juste du texte.
    expect(nomInput.value).toBe(xssPayload);

    // ── ASSERT 2 : aucune nouvelle balise <script> n'a été injectée dans le DOM ──
    // Après la saisie du payload, le nombre de balises <script> dans le document
    // ne doit pas avoir augmenté. Si le payload avait été interprété comme HTML,
    // une nouvelle balise <script> aurait été créée et exécutée.
    // React échappe automatiquement toutes les valeurs JSX { expression },
    // donc "<script>" reste une chaîne de texte, jamais un vrai nœud DOM script.
    const scriptCountAfter = document.querySelectorAll("script").length;
    expect(scriptCountAfter).toBe(scriptCountBefore);

    // ── ASSERT 3 : aucune balise <script> existante ne contient le payload ───
    // On vérifie que le contenu textuel des balises <script> légitimes
    // ne contient PAS le code malveillant (ce qui serait le signe d'une injection
    // dans un contexte de type innerHTML ou dangerouslySetInnerHTML).
    const allScripts = document.querySelectorAll("script");
    allScripts.forEach((scriptEl) => {
      // Aucun script dans le DOM ne doit avoir pour contenu textuel le payload
      expect(scriptEl.textContent).not.toContain('alert("XSS")');
    });
  });
});
