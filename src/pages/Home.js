import React from "react";
import { Link } from "react-router-dom";
import bg from "../assets/bg.png";

function Home() {
  return (
    <div
      className="w-full h-screen  flex flex-col items-center justify-center"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <h1 className="text-[#F9F1E7] lg:text-4xl lg:mt-8 mt-2">Bienvenue sur MonApp de Chat</h1>

      <main className="w-full h-screen flex flex-col items-start ">
        <div className="lg:w-1/2 flex flex-col justify-center items-center h-auto my-auto p-8">
          <h2 className="lg:text-4xl font-bold text-[#0B8144] lg:w-2/3 text-center mb-8">
          Bienvenue dans notre communauté de messagerie instantanée !
          </h2>
          <Link to="/signin" className="bg-tertiary p-2 rounded-lg text-white block">
            Se connecter
          </Link>{" "}
          <span className="text-white my-4">ou</span>
          <Link to="/signup" className="bg-tertiary p-2 rounded-lg text-white block">
            S'inscrire
          </Link>
        </div>
      </main>
    </div>
  );
}

export default Home;
