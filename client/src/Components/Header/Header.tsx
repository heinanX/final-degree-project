import { useSocket as customerSocket } from "../../contexts/customer.context";
import logo from "../../assets/images/vhs-tape-logo.png";
import TemporaryDrawer from "./Cart/Cart.drawer";
import LoggedOutUi from "./Login/LoggedOut.ui";
import LoggedInUi from "./Login/LoggedIn.ui";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import './header.css'

/* A COMPONENT THAT RENDERS OUT HEADER SECTION ON WEBSITE
  - it contains secondary logo, login and cart
*/

const Header = () => {
  // destructures boolean that indicated a users logged in status from customer context
  const { isLoggedIn } = customerSocket();

  // State to manage state of cart drawer
  const [open, setOpen] = useState(false);

  // Function to handle toggling cart drawer
  const handleDrawer = () => {
    setOpen(!open);
  };

  return (
    <div className="fixed top-0 left-0 text-white z-10 px-10 py-2 flex flex-row justify-between items-center w-full">
      {/* renders secondary logo that navigates back to home when clicked */}
      <NavLink to={"/"}>
        <img src={logo} style={{ width: "70px" }} alt="" />
      </NavLink>

      <div>
        <ul className="flex flex-row gap-4 items-center text-xl">
          {/* conditional render that sets design on user icon based on user login status */}
          {isLoggedIn ? <LoggedInUi /> : <LoggedOutUi />}
          
          {/* cart drawer that holds summary of cart, icon is rendered inside component */}
          <li>
            <button
              className="w-50 flex flex-row gap-2 items-center pt-1 text-2xl"
              onClick={handleDrawer}
            >
              <TemporaryDrawer />
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
