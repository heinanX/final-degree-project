import { Fragment, useState, KeyboardEvent } from "react";
import { useSocket as cartSocket } from "../../../contexts/cart.context";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import { LuVideotape } from "react-icons/lu";
import CartDetails from "./Cart.details";
import { NavLink } from "react-router-dom";

type Anchor = "right";

const CartDrawer = () => {
  const { cartTotal} = cartSocket();
  const [state, setState] = useState({
    right: false,
  });

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
    >
      <div className="w-96  px-6">
        <h1 className="text-2xl py-6">Cart</h1>
        <Divider />
      <CartDetails />
      <Divider />
      <span className="flex flex-row py-10 justify-between">
      <p className="font-medium">Total sum: </p>
        <p>{cartTotal}</p>
        <NavLink to={'/checkout'}>
           <button className="standard-btn" onClick={toggleDrawer(anchor, false)}> Go to checkout</button>
        </NavLink>
     
      </span>
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
