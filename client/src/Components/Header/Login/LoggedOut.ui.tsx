import { useState } from "react";
import LoginForm from "./LoginForm";
import { FaUserNinja } from "react-icons/fa";
const LoggedOutUi = () => {
  const [showLoginForm, setShowLoginForm] = useState<boolean>();
  const handleLogin = () => {
    setShowLoginForm(!showLoginForm);
  };

  return (
    <li className="relative">
      <button
        className="w-50 flex flex-row gap-2 items-center"
        onClick={handleLogin}
      >
        <p className="text-base uppercase tracking-wider">Sign in </p>
        <FaUserNinja />
      </button>
      {showLoginForm ? <LoginForm /> : <></>}
    </li>
  );
};

export default LoggedOutUi;
