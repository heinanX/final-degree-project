import { FaUserNinja } from "react-icons/fa";
import { LuVideotape } from "react-icons/lu";
import logo from "../../../assets/images/logo-videoshack_tape.png";
import { useState } from "react";
import LoginForm from "./LoginForm";

const Header = () => {
  const [showLoginForm, setShowLoginForm] = useState<boolean>();

  const handleLogin = () => {
    setShowLoginForm(!showLoginForm);    
  };

  return (
    <div className="fixed text-white z-10 px-10 py-2 flex flex-row justify-between items-center w-full">
      <img src={logo} style={{ width: "120px" }} alt="" />

      <nav>
        <ul className="flex flex-row gap-4 items-center text-xl">
          <li className="relative">
            <button
              className="w-50 flex flex-row gap-2 items-center"
              onClick={handleLogin}
            >
              <p className="text-base uppercase tracking-wider">Sign in </p>
              <FaUserNinja />
            </button>
            { showLoginForm ? <LoginForm /> : <></> }
          </li>
          <li>
            <button className="w-50 flex flex-row gap-2 items-center pt-1 text-2xl">
              <LuVideotape />
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Header;