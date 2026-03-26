/**
 * Register.test.jsx
 * ==================
 * MISSION 1 — Tests unitaires du formulaire d'inscription
 *
 * Composant teste : Register (src/pages/Register.jsx)
 * Pourquoi ce composant ?
 *   - Formulaire complexe avec 5 champs + 2 checkboxes (CGV, confidentialite)
 *   - Validation cote client (correspondance des mots de passe, longueur min.)
 *   - Appel API asynchrone via registerClient (service api.js qui wrape fetch)
 *   - Gestion des etats : succes (toast + redirect), erreur (toast)
 *   -> Il couvre toutes les exigences du referentiel DWWM pour les tests unitaires
 *
 * Framework : Vitest (natif pour les projets Vite)
 * Outils utilises :
 *   - Vitest  : describe, test, expect, vi, beforeEach (exposes globalement)
 *   - React Testing Library : render, screen, fireEvent, waitFor
 *   - @testing-library/jest-dom : matchers DOM (toBeInTheDocument, etc.)
 *
 * Adaptations par rapport au template du cours :
 *   - Register.jsx utilise toast.success() / toast.error() (react-hot-toast)
 *     au lieu d'afficher les messages directement dans le DOM.
 *     -> On mocke react-hot-toast et on verifie les appels aux fonctions toast.
 *   - Register.jsx utilise useContext(AuthContext) pour acceder a la fonction login.
 *     -> On fournit un AuthContext.Provider avec des valeurs factices.
 *   - Les labels HTML n'ont pas de ":" (ex: "Nom *" et non "Nom :").
 *     -> Les regex des selecteurs sont adaptees en consequence.
 *   - Deux checkboxes obligatoires (CGV + confidentialite) doivent etre cochees
 *     pour que la soumission atteigne l'appel API.
 */

import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Register from "../pages/Register";
import { AuthContext } from "../context/AuthContex.jsx";

// ─── Mock de react-hot-toast ─────────────────────────────────────────────────
// Register.jsx utilise toast.success("...") et toast.error("...") pour les messages.
// On cree des espions vi.fn() via vi.hoisted() pour pouvoir les referencer
// dans les assertions ET dans le corps de vi.mock() (qui est hisse en tete de fichier).
const { mockToastSuccess, mockToastError } = vi.hoisted(() => ({
  mockToastSuccess: vi.fn(),
  mockToastError: vi.fn(),
}));

vi.mock("react-hot-toast", () => {
  // On remplace le module par un objet qui simule la fonction toast
  // avec ses methodes .success() et .error()
  const toast = vi.fn();
  toast.success = mockToastSuccess;
  toast.error = mockToastError;
  return { default: toast };
});

// ─── Mock de useNavigate ─────────────────────────────────────────────────────
// vi.hoisted() permet de declarer des variables AVANT que vi.mock() soit hisse
// en tete de fichier par Vitest. Sans vi.hoisted(), mockNavigate serait undefined
// au moment ou le mock de react-router-dom s'execute.
const { mockNavigate } = vi.hoisted(() => ({
  mockNavigate: vi.fn(),
}));

// vi.mock() remplace le module react-router-dom par notre version simulee.
// On garde tous les exports reels (...actual) et on remplace uniquement useNavigate
// par une fonction espion pour eviter les vraies navigations pendant les tests.
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    // useNavigate retourne notre espion a la place de la vraie fonction de navigation
    useNavigate: () => mockNavigate,
  };
});

// ─── Contexte AuthContext simule ─────────────────────────────────────────────
// Register.jsx fait : const { login } = useContext(AuthContext)
// Sans Provider, useContext retourne undefined et le composant crashe.
// On fournit un objet factice avec les proprietes attendues.
const authValue = {
  user: null,
  isAuthenticated: false,
  login: vi.fn(),
  logout: vi.fn(),
  loading: false,
};

// ─── Fonction utilitaire ─────────────────────────────────────────────────────
// On enveloppe Register dans AuthContext.Provider ET MemoryRouter car le
// composant utilise useContext(AuthContext), <Link> et useNavigate,
// qui necessitent ces contextes pour fonctionner.
const renderRegister = () =>
  render(
    <AuthContext.Provider value={authValue}>
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    </AuthContext.Provider>
  );

// ─── Suite de tests ──────────────────────────────────────────────────────────
describe("Register — Formulaire d'inscription", () => {
  // beforeEach : code execute avant CHAQUE test de cette suite
  beforeEach(() => {
    // Reinitialise l'espion navigate entre chaque test pour eviter les faux positifs
    mockNavigate.mockClear();
    // Reinitialise les espions toast
    mockToastSuccess.mockClear();
    mockToastError.mockClear();
    // Reinitialise le mock global de fetch (chaque test definit ses propres reponses)
    // registerClient (api.js) utilise fetch() en interne
    global.fetch = vi.fn();
  });

  // ═══════════════════════════════════════════════════════════════════════════
  // TEST 1 — Rendu initial
  // Verifie que le composant affiche correctement tous ses elements au chargement.
  // C'est le test le plus basique : "est-ce que l'interface s'affiche comme prevu ?"
  // Pattern AAA -> Arrange (render) + Assert (expect)
  //
  // Note : Les labels dans Register.jsx sont :
  //   "Nom *", "Prenom *", "Adresse e-mail *", "Mot de passe *",
  //   "Confirmer le mot de passe *"
  //   L'asterisque est dans un <span aria-hidden="true"> donc ignore par RTL
  //   lors du calcul du nom accessible.
  // ═══════════════════════════════════════════════════════════════════════════
  test("affiche tous les champs et le bouton de soumission au rendu initial", () => {
    // ARRANGE : on rend le composant dans le DOM virtuel (jsdom)
    renderRegister();

    // ASSERT : on verifie que chaque champ est present via son label associe
    // getByLabelText() cherche un input associe a un <label> via htmlFor/id
    // Le ^ dans la regex ancre au debut : /^nom/i cible "Nom" mais pas "Prenom"
    expect(screen.getByLabelText(/^nom/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^prénom/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/adresse e-mail/i)).toBeInTheDocument();
    // /^mot de passe/i cible "Mot de passe" mais pas "Confirmer le mot de passe"
    expect(screen.getByLabelText(/^mot de passe/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/confirmer le mot de passe/i)).toBeInTheDocument();

    // Verifie que le bouton "S'inscrire" est bien present dans le DOM
    expect(
      screen.getByRole("button", { name: /s'inscrire/i })
    ).toBeInTheDocument();
  });

  // ═══════════════════════════════════════════════════════════════════════════
  // TEST 2 — Interaction utilisateur reussie
  // Simule un utilisateur qui remplit correctement le formulaire et le soumet.
  // Verifie que le message de succes s'affiche (via toast) apres une reponse
  // API positive.
  // Pattern AAA -> Arrange (mock fetch + render) + Act (saisie + clic) + Assert (waitFor)
  //
  // Specificites de Register.jsx :
  //   - Utilise registerClient() du service api.js (qui wrape fetch())
  //   - Affiche le succes via toast.success() et non dans le DOM
  //   - Requiert que les checkboxes CGV et confidentialite soient cochees
  // ═══════════════════════════════════════════════════════════════════════════
  test("affiche le message de succes apres une inscription valide", async () => {
    // ARRANGE : on simule une reponse API positive sans faire de vraie requete reseau.
    // mockResolvedValueOnce() : la prochaine fois que fetch() est appele,
    // il retournera cette valeur Promise resolue (reponse HTTP simulee).
    // registerClient (api.js) appelle fetch() en interne via fetchWithAuth().
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ message: "Compte cree" }),
    });

    renderRegister();

    // ACT : on remplit tous les champs du formulaire
    // fireEvent.change() simule la saisie utilisateur en declenchant l'evenement onChange
    fireEvent.change(screen.getByLabelText(/^nom/i), {
      target: { value: "Dupont" },
    });
    fireEvent.change(screen.getByLabelText(/^prénom/i), {
      target: { value: "Marie" },
    });
    fireEvent.change(screen.getByLabelText(/adresse e-mail/i), {
      target: { value: "marie.dupont@email.fr" },
    });
    // Les deux mots de passe sont IDENTIQUES -> la validation cote client passera
    fireEvent.change(screen.getByLabelText(/^mot de passe/i), {
      target: { value: "MotDePasse123!" },
    });
    fireEvent.change(screen.getByLabelText(/confirmer le mot de passe/i), {
      target: { value: "MotDePasse123!" },
    });

    // On coche les deux checkboxes obligatoires :
    // 1. Accepter les Conditions Generales de Vente
    // 2. Prendre connaissance de la Politique de confidentialite
    // Sans ces cases cochees, handleSubmit affiche une erreur toast et bloque la soumission.
    fireEvent.click(screen.getByLabelText(/j'accepte les/i));
    fireEvent.click(screen.getByLabelText(/j'ai pris connaissance/i));

    // On clique sur le bouton de soumission
    fireEvent.click(screen.getByRole("button", { name: /s'inscrire/i }));

    // ASSERT : on attend (waitFor) que toast.success soit appele apres l'appel async fetch()
    // waitFor() reessaie l'assertion jusqu'a ce qu'elle passe ou que le timeout expire.
    // Register.jsx appelle : toast.success("Inscription reussie ! Connectez-vous.")
    await waitFor(() => {
      expect(mockToastSuccess).toHaveBeenCalledWith(
        "Inscription réussie ! Connectez-vous."
      );
    });

    // On verifie aussi que fetch a bien ete appele une seule fois (l'API a ete contactee)
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });

  // ═══════════════════════════════════════════════════════════════════════════
  // TEST 3 — Gestion d'erreur : mots de passe non identiques
  // Verifie que la validation cote client bloque la soumission et affiche
  // un message d'erreur (via toast) quand les mots de passe ne correspondent pas.
  // Pattern AAA -> Arrange (render) + Act (saisie + submit) + Assert (toast.error)
  // ═══════════════════════════════════════════════════════════════════════════
  test("affiche une erreur si les mots de passe ne correspondent pas", async () => {
    // ARRANGE
    renderRegister();

    // ACT : on saisit deux mots de passe DIFFERENTS dans les deux champs
    fireEvent.change(screen.getByLabelText(/^mot de passe/i), {
      target: { value: "MotDePasseA1!" },
    });
    fireEvent.change(screen.getByLabelText(/confirmer le mot de passe/i), {
      target: { value: "MotDePasseB2!" },
    });

    // fireEvent.submit() soumet le formulaire directement, contournant le bouton disabled.
    // Cela declenche le handler onSubmit du formulaire, qui effectue la validation.
    // .closest("form") remonte du bouton vers l'element <form> parent.
    fireEvent.submit(
      screen.getByRole("button", { name: /s'inscrire/i }).closest("form")
    );

    // ASSERT : toast.error doit etre appele avec le message d'erreur
    // Register.jsx appelle : toast.error("Les mots de passe ne correspondent pas")
    // handleSubmit est async, on utilise waitFor() par securite
    await waitFor(() => {
      expect(mockToastError).toHaveBeenCalledWith(
        "Les mots de passe ne correspondent pas"
      );
    });

    // On s'assure que fetch n'a PAS ete appele :
    // la validation a bloque l'envoi avant meme d'atteindre l'appel reseau
    expect(global.fetch).not.toHaveBeenCalled();
  });
});
