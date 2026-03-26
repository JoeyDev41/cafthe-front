/**
 * Login.test.jsx
 * ==================
 * MISSION 3 — Tests unitaires du formulaire de connexion
 *
 * Composant testé : Login (src/pages/Login.jsx)
 * Pourquoi ce composant ?
 *   - Formulaire avec 2 champs (email, mot de passe)
 *   - Appel API asynchrone via fetch() pour authentifier l'utilisateur
 *   - Gestion des états : succès (toast + login context + redirect), erreur (toast)
 *   -> Il couvre les scénarios "connexion réussie" et "mauvais identifiants"
 *
 * Framework : Vitest (natif pour les projets Vite)
 * Outils utilisés :
 *   - Vitest  : describe, test, expect, vi, beforeEach
 *   - React Testing Library : render, screen, fireEvent, waitFor
 *   - @testing-library/jest-dom : matchers DOM (toBeInTheDocument, etc.)
 *
 * Adaptations par rapport au composant Login.jsx :
 *   - Login.jsx utilise toast.success() / toast.error() (react-hot-toast)
 *     -> On mocke react-hot-toast et on vérifie les appels aux fonctions toast.
 *   - Login.jsx utilise useContext(AuthContext) pour accéder à la fonction login.
 *     -> On fournit un AuthContext.Provider avec des valeurs factices.
 *   - Les labels HTML sont : "Adresse e-mail", "Mot de passe" (sans ":" ni "*").
 */

import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Login from "../pages/Login";
import { AuthContext } from "../context/AuthContex.jsx";

// ─── Mock de react-hot-toast ─────────────────────────────────────────────────
// Login.jsx utilise toast.success("Connexion réussie") et toast.error("...")
// On crée des espions vi.fn() via vi.hoisted() pour pouvoir les référencer
// dans les assertions ET dans le corps de vi.mock().
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

// ─── Mock de useNavigate ─────────────────────────────────────────────────────
// vi.hoisted() déclare mockNavigate AVANT que vi.mock() soit hissé en tête.
const { mockNavigate } = vi.hoisted(() => ({
  mockNavigate: vi.fn(),
}));

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

// ─── Contexte AuthContext simulé ─────────────────────────────────────────────
// Login.jsx fait : const { login } = useContext(AuthContext)
// Sans Provider, useContext retourne undefined et le composant crashe.
const mockLogin = vi.fn();
const authValue = {
  user: null,
  isAuthenticated: false,
  login: mockLogin,
  logout: vi.fn(),
  loading: false,
};

// ─── Fonction utilitaire ─────────────────────────────────────────────────────
// On enveloppe Login dans AuthContext.Provider ET MemoryRouter car le
// composant utilise useContext(AuthContext), <Link> et useNavigate.
const renderLogin = () =>
  render(
    <AuthContext.Provider value={authValue}>
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    </AuthContext.Provider>
  );

// ─── Suite de tests ──────────────────────────────────────────────────────────
describe("Login — Formulaire de connexion", () => {
  // beforeEach : code exécuté avant CHAQUE test de cette suite
  beforeEach(() => {
    mockNavigate.mockClear();
    mockToastSuccess.mockClear();
    mockToastError.mockClear();
    mockLogin.mockClear();
    // Réinitialise le mock global de fetch (chaque test définit ses propres réponses)
    global.fetch = vi.fn();
  });

  // ═══════════════════════════════════════════════════════════════════════════
  // TEST 1 — Rendu initial
  // Vérifie que le composant affiche correctement tous ses éléments au chargement.
  // Pattern AAA -> Arrange (render) + Assert (expect)
  //
  // Les labels dans Login.jsx sont :
  //   "Adresse e-mail", "Mot de passe"
  // ═══════════════════════════════════════════════════════════════════════════
  test("affiche les champs email, mot de passe et le bouton de connexion", () => {
    // ARRANGE : on rend le composant dans le DOM virtuel (jsdom)
    renderLogin();

    // ASSERT : on vérifie que chaque champ est présent via son label associé
    // getByLabelText() cherche un input associé à un <label> via htmlFor/id
    expect(screen.getByLabelText(/adresse e-mail/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/mot de passe/i)).toBeInTheDocument();

    // Vérifie que le bouton "Se connecter" est bien présent dans le DOM
    expect(
      screen.getByRole("button", { name: /se connecter/i })
    ).toBeInTheDocument();
  });

  // ═══════════════════════════════════════════════════════════════════════════
  // TEST 2 — Connexion réussie
  // Simule un utilisateur qui saisit ses identifiants et se connecte avec succès.
  // Vérifie que toast.success est appelé et que login() du contexte est invoqué.
  // Pattern AAA -> Arrange (mock fetch + render) + Act (saisie + clic) + Assert
  //
  // Login.jsx :
  //   - Appelle fetch() directement (pas via le service api.js)
  //   - Sur succès : toast.success("Connexion réussie"), login(data.client), navigate(redirect)
  // ═══════════════════════════════════════════════════════════════════════════
  test("affiche le message de succès après une connexion valide", async () => {
    // ARRANGE : on simule une réponse API positive.
    // mockResolvedValueOnce() : la prochaine fois que fetch() est appelé,
    // il retournera cette valeur (réponse HTTP simulée avec un objet client).
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ client: { id: 1, nom: "Dupont", email: "marie@email.fr" } }),
    });

    renderLogin();

    // ACT : on remplit les champs du formulaire
    // fireEvent.change() simule la saisie utilisateur en déclenchant l'événement onChange
    fireEvent.change(screen.getByLabelText(/adresse e-mail/i), {
      target: { value: "marie@email.fr" },
    });
    fireEvent.change(screen.getByLabelText(/mot de passe/i), {
      target: { value: "MotDePasse123!" },
    });

    // On clique sur le bouton de soumission
    fireEvent.click(screen.getByRole("button", { name: /se connecter/i }));

    // ASSERT : on attend (waitFor) que toast.success soit appelé après l'appel async fetch()
    // Login.jsx appelle : toast.success("Connexion réussie")
    await waitFor(() => {
      expect(mockToastSuccess).toHaveBeenCalledWith("Connexion réussie");
    });

    // On vérifie que la fonction login du contexte Auth a été appelée avec les données client
    expect(mockLogin).toHaveBeenCalledWith({
      id: 1,
      nom: "Dupont",
      email: "marie@email.fr",
    });

    // On vérifie que fetch a bien été appelé une seule fois
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });

  // ═══════════════════════════════════════════════════════════════════════════
  // TEST 3 — Mauvais identifiants
  // Simule un utilisateur qui saisit des identifiants incorrects.
  // Vérifie que toast.error est appelé avec le message d'erreur du serveur.
  // Pattern AAA -> Arrange (mock fetch erreur + render) + Act (saisie + clic) + Assert
  //
  // Login.jsx :
  //   - Si !response.ok : toast.error(data.message || "Erreur de connexion")
  //   - La fonction login() ne doit PAS être appelée
  // ═══════════════════════════════════════════════════════════════════════════
  test("affiche une erreur en cas de mauvais identifiants", async () => {
    // ARRANGE : on simule une réponse API négative (401 Unauthorized)
    // Le serveur retourne un message d'erreur dans le corps de la réponse
    global.fetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({ message: "Email ou mot de passe incorrect" }),
    });

    renderLogin();

    // ACT : on saisit des identifiants incorrects
    fireEvent.change(screen.getByLabelText(/adresse e-mail/i), {
      target: { value: "mauvais@email.fr" },
    });
    fireEvent.change(screen.getByLabelText(/mot de passe/i), {
      target: { value: "MauvaisMDP" },
    });

    // On clique sur le bouton de soumission
    fireEvent.click(screen.getByRole("button", { name: /se connecter/i }));

    // ASSERT : toast.error doit être appelé avec le message d'erreur du serveur
    // Login.jsx appelle : toast.error(data.message || "Erreur de connexion")
    await waitFor(() => {
      expect(mockToastError).toHaveBeenCalledWith(
        "Email ou mot de passe incorrect"
      );
    });

    // On s'assure que login() n'a PAS été appelé :
    // l'authentification a échoué, le contexte ne doit pas être modifié
    expect(mockLogin).not.toHaveBeenCalled();
  });
});
