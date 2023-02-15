import React, { useState, useEffect, useContext } from 'react';
import { signInWithEmailAndPassword, onAuthStateChanged, signInWithPopup, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

// Créer le contexte d'authentification
const AuthContext = React.createContext();

// Fonction qui permet d'utiliser le contexte d'authentification
export function useAuth() {
  return useContext(AuthContext);
}

// Fonction qui fournit le contexte d'authentification aux composants enfants
export  function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);

  // Fonction pour connecter l'utilisateur avec Google
  async function loginWithGoogle() {
    const provider = auth.GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      setCurrentUser(result.user);
      return result;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  // Fonction pour connecter l'utilisateur avec Facebook
  async function loginWithFacebook() {
    const provider = auth.FacebookAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      setCurrentUser(result.user);
      return result;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  // Fonction pour connecter l'utilisateur
  async function login(email, password) {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      setCurrentUser(result.user);
      return result;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  // Fonction pour inscrire un utilisateur
  async function signup(email, password) {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      setCurrentUser(result.user);
      return result;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  // Fonction pour déconnecter l'utilisateur
  function logout() {
    return auth().signOut();
  }

  // Effet qui écoute les changements d'état de l'utilisateur Firebase
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });

    return unsubscribe;
  }, []);

  // Valeurs fournies par le contexte
  const value = {
    currentUser,
    login,
    signup,
    logout,
    loginWithGoogle,
    loginWithFacebook,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
