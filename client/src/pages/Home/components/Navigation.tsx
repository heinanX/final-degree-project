import { NavLink } from "react-router-dom";

/* A COMPONENT THAT RENDERS NAV BAR ON HOME PAGE
  - stores, events, complete movie library
*/

const Navigation = () => {
  return (
    <nav className="w-full">
      <ul className="w-full flex flex-row gap-4 justify-center text-white py-4 uppercase tracking-wider text-sm">
        {/* NavLink for li, pointing to the referenced route */}
        <NavLink to={"/stores"}>
          <li>Stores</li>
        </NavLink>

        <NavLink to={"/events"}>
          <li>Events</li>
        </NavLink>

        <NavLink to={"/products/movies"}>
          <li>Movie library</li>
        </NavLink>
      </ul>
    </nav>
  );
};

export default Navigation;