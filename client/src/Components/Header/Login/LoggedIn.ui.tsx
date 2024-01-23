import { useState } from "react";
import { FaUserNinja } from "react-icons/fa";
import CustomerDrawer from "../Customer.drawer";

const LoggedInUi = () => {
  const [showDrawer, setShowDrawer] = useState<boolean>();

  const handleDrawer = () => {
    setShowDrawer(!showDrawer);
  };

  return (
    <li className="relative">
      <button
        className="w-50 flex flex-row gap-2 items-center"
        onClick={handleDrawer}
      >
        <p className="text-base uppercase tracking-wider">Log out </p>
        <FaUserNinja />
      </button>
      { showDrawer ? <CustomerDrawer /> : <></> }
    </li>
  );
};

export default LoggedInUi;
