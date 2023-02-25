import React, { useState, useEffect } from "react";
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase";


// Créer le contexte d'authentification
export const AuthContext = React.createContext();

// Fonction qui fournit le contexte d'authentification aux composants enfants
export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);

  //Fonction pour connecter l'utilisateur avec Google
  async function loginWithGoogle() {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    console.log(result.user);
    return result.user;
  }

  // Fonction pour connecter l'utilisateur à Facebook
  async function loginWithFacebook() {
    const provider = new FacebookAuthProvider();
    const result = await signInWithPopup(auth, provider);
    console.log(result.user);
    return result.user;
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
  async function signup(email, password, name) {
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
        
      );
      const user = result.user;
     
      setCurrentUser(user);
      return result;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

 

  // Fonction pour déconnecter l'utilisateur
  function logout() {
    return signOut(auth);
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
