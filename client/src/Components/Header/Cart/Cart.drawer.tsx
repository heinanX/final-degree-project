import { Fragment, useState, KeyboardEvent } from "react";
import { useSocket as cartSocket } from "../../../contexts/cart.context";
import { useSocket as customerSocket } from "../../../contexts/customer.context";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import { LuVideotape } from "react-icons/lu";
import CartDetails from "./Cart.details";
import { NavLink } from "react-router-dom";
import LoginBtn from "./Login.btn";
import CartIndicator from "./Cart.indicator";

// Defining type for the drawer anchor
type Anchor = "right";

/* A PRE-DEFINED COMPONENT FROM MATERIAL UI
  - cart icon is set in return along with cart indicator
*/

const CartDrawer = () => {
  // desctructures properties from cart and customer contexts
  const { newCart } = cartSocket();
  const { isLoggedIn } = customerSocket();

  // State to manage the visibility of the drawer
  const [state, setState] = useState({
    right: false,
  });

  // state to manage visibility of a message (for login button if a user is not logged in)
  const [loginMsg, setLoginMsg] = useState<boolean>(false);

  // function to toggle the drawer's visibility
  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as KeyboardEvent).key === "Tab" ||
          (event as KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });
    };

  // tsx structure for drawer content
  const list = (anchor: Anchor) => (
    <Box
      sx={{ width: anchor === "right" ? "auto" : 250 }}
      role="presentation"
      onKeyDown={toggleDrawer(anchor, false)}
      height={"100%"}
    >
      <div className="w-96 h-full px-6 flex flex-col justify-between">
        <div>
          {/* drawer title and divider */}
          <h1 className="text-2xl py-6">Cart</h1>
          <Divider />
        </div>

        {/* cart details and divider */}
        <div>
          <CartDetails />
          <Divider />
        </div>

        {/* Order total */}
        <div className="flex flex-row justify-between px-6">
          <p className="font-medium">Order total: </p>
          <p>{newCart.total_price} sek</p>
        </div>

        {/* conditional render of a checkout button or login button with message */}
        <div className="flex flex-row py-10 justify-end">
          {isLoggedIn ? (
            <NavLink to={"/checkout"}>
              <button
                className="standard-btn"
                onClick={toggleDrawer(anchor, false)}
              >
                Go to checkout
              </button>
            </NavLink>
          ) : (
            /* another conditional render that sets the 'go to checkout' button to a login button
            when hovered over, as well as displays a message encouraging customer to log in. */
            <>
              {loginMsg ? (
                <>
                  <LoginBtn setLoginMsg={setLoginMsg} />
                </>
              ) : (
                //a button that doesn't really do anything
                <button
                  onMouseEnter={() => setLoginMsg(true)}
                  onMouseLeave={() => setLoginMsg(false)}
                  className="standard-btn cursor-not-allowed"
                >
                  Go to checkout
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </Box>
  );

  return (
    <div>
      {(["right"] as const).map((anchor) => (
        <Fragment key={anchor}>
          
          {/* cart icon and indicator */}
          <div
            className="text-2xl relative"
            onClick={toggleDrawer(anchor, true)}
          >
            <LuVideotape />
            <CartIndicator />
          </div>

          {/* drawer component */}
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </Fragment>
      ))}
    </div>
  );
};
export default CartDrawer;
