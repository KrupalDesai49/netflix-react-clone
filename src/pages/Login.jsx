import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { user, logIn } = UserAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('')
    try {
      await logIn(email, password);
      navigate("/");
    } catch (error) {
      console.log(error);
      setError(error.message)
    }
  };

  return (
    <>
      <div className="h-screen w-full">
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/ab4b0b22-2ddf-4d48-ae88-c201ae0267e2/0efe6360-4f6d-4b10-beb6-81e0762cfe81/IN-en-20231030-popsignuptwoweeks-perspective_alpha_website_large.jpg"
          alt="/"
          className="absolute hidden h-full w-full object-cover sm:block"
        />
        <div className="fixed left-0 top-0 h-screen w-full bg-black/60"></div>
        <div className="fixed z-50 w-full px-4 py-24">
          <div className="tex  mx-auto  max-w-[450px] rounded-md bg-black/30 text-white backdrop-blur-md">
            <div className="mx-auto max-w-[320px]  py-16 ">
              <h1 className="text-3xl font-bold">Sign In</h1>

              {error?<p className="p-3 bg-red-400 rounded my-2">{error}</p>:null}
              <form
                onSubmit={handleSubmit}
                className="flex w-full flex-col py-4"
              >
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  className="my-2 rounded bg-gray-700 p-3"
                  type="email"
                  placeholder="Email"
                  autoComplete="email"
                />
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  className="my-2 rounded bg-gray-700 p-3"
                  type="password"
                  placeholder="Password"
                  autoComplete="current-password"
                />
                <button className="my-6 rounded bg-[#e50914] py-3 font-bold">
                  Sign In
                </button>
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <p>
                    <input type="checkbox" className="mr-2 " />
                    Remember me
                  </p>
                  <p>Need Help?</p>
                </div>
                <p className="py-8">
                  <span className="text-gray-600">New to Netflix?</span>{" "}
                  <Link to="/login"> Sign Up</Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
