import { useState } from "react";
import { FaUserNinja } from "react-icons/fa";
import CustomerDrawer from "../Customer.drawer";

/* A COMPONENT FOR THE UI WHEN A USER IS LOGGED IN */

const LoggedInUi = () => {
  // State to manage the visibility of the customer drawer
  const [showDrawer, setShowDrawer] = useState<boolean>();

  // Function to toggle the visibility of the customer drawer
  const handleDrawer = () => {
    setShowDrawer(!showDrawer);
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
      {showDrawer ? <CustomerDrawer /> : <></>}
    </li>
  );
};

export default LoggedInUi;
