import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";

function SignUpPage() {
  const { signup } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formState, setFormState] = useState({
    email: "",
    password: "",
    nom:""
  });

  function handleInputChange(event) {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  }

  async function handleFormSubmit(event) {
    event.preventDefault();

    if (!formState.nom) {
      console.log("Veuillez saisir un nom valide");
      return;
    }

    try {
      const result = await signup(formState.email, formState.password, formState.nom);
      const user = result.user;
      await addUserToFirestore(user, formState.nom);

      navigate("/signin");
    } catch (error) {
      console.log(error);
      // Afficher le message d'erreur à l'utilisateur
    }
  }

   // Fonction pour ajouter un utilisateur à la base de données Firestore
   const addUserToFirestore = async (user, name) => {
    const { uid, email } = user;
    const userRef = collection(db, "users");
    await addDoc(userRef, {
      id: uid,
      name: name,
      email: email,
    });
  };

  return (
    <main className="w-full h-screen bg-primary flex items-center justify-center">
      <form onSubmit={handleFormSubmit} className="flex flex-col border gap-8 p-16 border rounded-lg w-4/12">
        <div className="flex flex-col">
          <label className="text-white mb-2">Email:</label>
          <input
            type="email"
            name="email"
            value={formState.email}
            onChange={handleInputChange}
            placeholder="Entrer votre email"
            className="block w-full   rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm"
          />
        </div>
        <div className="flex flex-col ">
          <label className="text-white mb-2">Password:</label>
          <input
            type="password"
            name="password"
            placeholder="Entrer votre mot de passe"
            value={formState.password}
            onChange={handleInputChange}
            className="block w-full   rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm"
          />
        </div>
        <div className="flex flex-col ">
          <label className="text-white mb-2">Nom ou pseudo</label>
          <input
            type="text"
            name="nom"
            placeholder="Entrer votre nom ou pseudo"
            value={formState.nom}
            onChange={handleInputChange}
            className="block w-full   rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm"
          />
        </div>

        <button type="submit" className="text-white p-2 bg-tertiary rounded-lg ">Sign up</button>
      </form>
    </main>
  );
}

export default SignUpPage;
