//import { useState } from "react";
import { FaUserNinja } from "react-icons/fa";
import LoggedInDrawer from "./LoggedIn.drawer";
import { useSocket as customerSocket } from "../../../contexts/customer.context";

/* A COMPONENT FOR THE UI WHEN A USER IS LOGGED IN */

const LoggedInUi = () => {
  const {showLoggedInDrawer, setShowLoggedInDrawer } = customerSocket();

  // Function to toggle the visibility of the customer drawer
  const handleDrawer = () => {
    setShowLoggedInDrawer(!showLoggedInDrawer);
  };

  return (
    <li className="relative">
      <button
        className="w-50 flex flex-row gap-2 items-center"
        onClick={handleDrawer}
      >
        <p className="text-base uppercase tracking-wider">Log out</p>
        <FaUserNinja />
      </button>

      {showLoggedInDrawer ? <LoggedInDrawer /> : <></>}
    </li>
  );
};

export default LoggedInUi;
