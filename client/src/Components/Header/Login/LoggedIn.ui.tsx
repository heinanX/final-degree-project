//import { useState } from "react";
import { FaUserNinja } from "react-icons/fa";
import LoginDrawer from "./Login.drawer";
import { useSocket as customerSocket } from "../../../contexts/customer.context";

/* A COMPONENT FOR THE UI WHEN A USER IS LOGGED IN */

const LoggedInUi = () => {
  // State to manage the visibility of the customer drawer destructured from customer context
  const {showLoginDrawer, setShowLoginDrawer } = customerSocket();

  // Function to toggle the visibility of the customer drawer
  const handleDrawer = () => {
    setShowLoginDrawer(!showLoginDrawer);
  };

  return (
    <li className="relative">
      {/* Button for logging out and opening/closing the customer drawer */}
      <button
        className="w-50 flex flex-row gap-2 items-center"
        onClick={handleDrawer}
      >
        {/* Text and icon indicating log out */}
        <p className="text-base uppercase tracking-wider">Log out</p>
        <FaUserNinja />
      </button>

      {/* Rendering the customer drawer if showDrawer is true */}
      {showLoginDrawer ? <LoginDrawer /> : <></>}
    </li>
  );
};

export default LoggedInUi;
