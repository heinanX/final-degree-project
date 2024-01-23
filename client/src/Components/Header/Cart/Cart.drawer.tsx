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


type Anchor = "right";

const CartDrawer = () => {
  const { newCart } = cartSocket();
  const { isLoggedIn } = customerSocket();
  const [state, setState] = useState({
    right: false,
  });
  const [msg, setMsg] = useState<boolean>(false);

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

  const list = (anchor: Anchor) => (
    <Box
      sx={{ width: anchor === "right" ? "auto" : 250 }}
      role="presentation"
      onKeyDown={toggleDrawer(anchor, false)}
      height={"100%"}
    >
      <div className="w-96 h-full px-6 flex flex-col justify-between">
        <div>
          <h1 className="text-2xl py-6">Cart</h1>
          <Divider />
        </div>

        <div>
          <CartDetails />
          <Divider />
        </div>

        <div className="flex flex-row justify-between px-6">
          <p className="font-medium">Total sum: </p>
          <p>{newCart.total_price} sek</p>
        </div>

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
            <>
              {msg ? (
                <>
                  <LoginBtn setMsg={setMsg} />
                </>
              ) : (
                <button
                  onMouseEnter={() => setMsg(true)}
                  onMouseLeave={() => setMsg(false)}
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
          <div className="text-2xl" onClick={toggleDrawer(anchor, true)}>
            <LuVideotape />
          </div>
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
