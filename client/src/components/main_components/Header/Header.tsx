import { LuVideotape } from "react-icons/lu";
import logo from "../../../assets/images/logo-videoshack_tape.png";
import { useSocket as customerSocket} from "../../../contexts/customerContext";
import LoggedOutUi from "./LoggedOut.ui";
import LoggedInUi from "./LoggedIn.ui";

const Header = () => {

  const { isLoggedIn } = customerSocket();

  return (
    <div className="fixed text-white z-10 px-10 py-2 flex flex-row justify-between items-center w-full">
      <img src={logo} style={{ width: "120px" }} alt="" />

      <nav>
        <ul className="flex flex-row gap-4 items-center text-xl">
       { isLoggedIn ? <LoggedInUi /> : <LoggedOutUi /> } 
          <li>
            <button className="w-50 flex flex-row gap-2 items-center pt-1 text-2xl">
              <LuVideotape />
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Header;
