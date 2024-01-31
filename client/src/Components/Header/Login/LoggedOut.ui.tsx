import { useState } from "react";
import LoginForm from "./LoginForm";
import { FaUserNinja } from "react-icons/fa";

/* A COMPONENT FOR THE UI WHEN A USER IS LOGGED OUT */

const LoggedOutUi = () => {
  // State to manage the visibility of the login form
  const [showLoginForm, setShowLoginForm] = useState<boolean>();

  // Function to toggle the visibility of the login form
  const handleLogin = () => {
    setShowLoginForm(!showLoginForm);
  };

  return (
    <li className="relative">
      {/* button for opening/closing the login form */}
      <button
        className="w-50 flex flex-row gap-2 items-center"
        onClick={handleLogin}
      >
        {/* text and icon indicating sign-in */}
        <p className="text-base uppercase tracking-wider">Sign in</p>
        <FaUserNinja />
      </button>

      {/* renders login form if showLoginForm is true */}
      {showLoginForm ? <LoginForm /> : <></>}
    </li>
  );
};

export default LoggedOutUi;
