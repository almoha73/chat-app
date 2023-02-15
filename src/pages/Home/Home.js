import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  return (
    <div className="home">
      <h1>Bienvenue sur MonApp de Chat</h1>
      <main className="main-home">
        <h2>Ceci est une application de chat réalisée avec Firebase et React.</h2>
        <Link to="/signin">Se connecter</Link> ou{" "}
        <Link to="/signup">S'inscrire</Link>
      </main>
    </div>
  );
}

export default Home;
