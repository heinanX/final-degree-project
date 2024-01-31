import { NavLink } from "react-router-dom";
import { useSocket as customerSocket } from "../../../contexts/customer.context";

/* A COMPONENT FOR RENDERING CUSTOMER DRAWER WITH ACCOUNT OPTIONS
  - i.e My account, settings and Log out
*/

const LoginDrawer = () => {
  // Accessing logOut function from customerSocket
  const { logOut } = customerSocket();

  // Function to handle logout
  const handleLogout = () => {
    logOut();
  };

  // CSS styles for list item and button
  const liStyle = "hover:bg-gray-100";
  const btnStyle =
    "border-b border-gray-300 py-2 pr-2 hover:bg-gray-100 cursor-pointer px-2 w-full text-right tracking-wider";

  return (
    <div className="absolute top-8 right-0 w-40">
      {/* Customer drawer content */}
      <div className="bg-white text-red-700 rounded-sm text-xs w-full">
        <ul>
          {/* My account link */}
          <li>
            <NavLink to="/customer/account">
              <button className={btnStyle}>My account</button>
            </NavLink>
          </li>
          {/* Settings button */}
          <li className={liStyle}>
            <button className={btnStyle}>Settings</button>
          </li>
          {/* Logout button */}
          <li className={liStyle}>
            <button
              className={`${btnStyle} last:border-none`}
              onClick={handleLogout}
            >
              Logout
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default LoginDrawer;
