import google from "../assets/google.svg";
import facebook from "../assets/facebook.svg";
import { AuthContext } from "../context/AuthContext";
import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


export default function Signin() {
  const navigate = useNavigate();
  const { loginWithGoogle, loginWithFacebook, login, currentUser } = useContext(AuthContext);
  const [formState, setFormState] = useState({
    email: "",
    password: ""
  });

  useEffect(() => {
    if (currentUser) {
      navigate("/chat");
    }
  }, [currentUser, navigate]);

  function handleInputChange(event) {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  }

  async function handleFormSubmit(event) {
    event.preventDefault();
    try {
      await login(formState.email, formState.password);
      // navigation automatique via useEffect
    } catch (error) {
      console.log(error);
    }
  }

  const handleGoogleSignIn = async () => {
    try {
      const result = await loginWithGoogle();
      console.log(result);
      // setCurrentUser(result);
      navigate("/chat");
    } catch (error) {
      console.log(error);
    }
  };

  const handleFacebookSignIn = async () => {
    try {
      const result = await loginWithFacebook();
      console.log(result);
      // setCurrentUser(result);
      navigate("/chat");
    } catch (error) {
      console.log(error);
    }
  };

 

  return (
    <>
      <main className="bg-primary h-screen  flex w-full items-center justify-center">
        <div className="flex min-h-full w-full sm:w-11/12 flex-col justify-center py-12 sm:px-6 lg:px-8">
          <div className=" sm:mx-auto sm:w-full sm:max-w-md">
            <h2 className="lg:mt-6 text-center text-xl lg:text-3xl font-bold tracking-tight text-white">
              Sign in to your account
            </h2>
          </div>

          <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-white py-8 px-4 shadow-lg sm:rounded-lg sm:px-10">
              <form onSubmit={handleFormSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email address
                  </label>
                  <div className="mt-1">
                    <input
                      value={formState.email}
                      onChange={handleInputChange}
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      className="block w-full rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-[#27ae60] focus:outline-none focus:ring-[#27ae60] sm:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>
                  <div className="mt-1">
                    <input
                      value={formState.password}
                      onChange={handleInputChange}
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      required
                      className="block w-full autofill:bg-yellow-200  rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm"
                    />
                  </div>
                  
                </div>

                {/*  */}

                <div>
                  <button
                    type="submit"
                    className="text-white p-2 bg-[#27ae60] rounded-lg hover:bg-[#14532d] transition"
                  >
                    Sign up
                  </button>
                </div>
              </form>

              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="bg-white px-2 text-gray-500">
                      Or continue with
                    </span>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-3 gap-3">
                  <div>
                    <button className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-500 shadow-sm hover:bg-gray-50">
                      <span className="sr-only">Sign in with Facebook</span>
                      <img
                        onClick={handleFacebookSignIn}
                        src={facebook}
                        alt=""
                        className="h-5 w-5"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                  <div>
                    <button
                      onClick={handleGoogleSignIn}
                      className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-500 shadow-sm hover:bg-gray-50"
                    >
                      <span className="sr-only">Sign in with Google</span>

                      <img src={google} alt="" className="w-5" />
                    </button>
                  </div>
                </div>
                <p className="mt-2">
                  Vous n'avez pas de compte ?{" "}
                  <a href="/signup" className="text-tertiary">
                    Inscrivez-vous
                  </a>{" "}
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
