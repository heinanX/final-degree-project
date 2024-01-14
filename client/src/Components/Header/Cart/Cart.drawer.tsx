import {Fragment, useState, KeyboardEvent} from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import { LuVideotape } from "react-icons/lu";

type Anchor = "right";

export default function TemporaryDrawer() {
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
      <div className="w-80">
        <h1 className="text-2xl py-6 px-6">Cart</h1>
        <Divider />
        <div className="px-6 py-8">
          <p>movies</p>
        </div>
      </div>
    </Box>
  );

  return (
    <div>
      {(["right"] as const).map((anchor) => (
        <Fragment key={anchor}>
          <button className="text-2xl" onClick={toggleDrawer(anchor, true)}>
            <LuVideotape />
          </button>
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
}
