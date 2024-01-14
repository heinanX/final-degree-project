
import logo from "../../assets/images/logo-videoshack_tape.png";
import { useSocket as customerSocket} from "../../contexts/customer.context";
import LoggedOutUi from "./LoggedOut.ui";
import LoggedInUi from "./LoggedIn.ui";

import { useState } from "react";
import TemporaryDrawer from "./Cart/Cart.drawer";
//import Checkout from "../../pages/CheckoutPage/Checkout.page";

const Header = () => {

  const { isLoggedIn } = customerSocket();
  const [open, setOpen] = useState(false);

  const handleDrawer = () => {
    setOpen(!open)
  }

  return (
    <div className="fixed text-white z-10 px-10 py-2 flex flex-row justify-between items-center w-full">
      <img src={logo} style={{ width: "120px" }} alt="" />

      <nav>
        <ul className="flex flex-row gap-4 items-center text-xl">
       { isLoggedIn ? <LoggedInUi /> : <LoggedOutUi /> } 
          <li>
            <button className="w-50 flex flex-row gap-2 items-center pt-1 text-2xl" onClick={handleDrawer}>
                          <TemporaryDrawer />
            </button>

          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Header;
