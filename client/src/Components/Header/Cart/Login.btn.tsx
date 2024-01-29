import { NavLink } from "react-router-dom";

interface props {
    setLoginMsg: React.Dispatch<React.SetStateAction<boolean>>
}

/* A COMPONENT THAT RENDERS OUT A LOGIN BUTTON THAT NAVIGATES TO LOGIN PAGE
  - it recieves the function to set visibility of loginMsg state through props */

const LoginBtn = ({setLoginMsg}: props) => {
  return (
    <>
      <p className="text-md pr-6 text-red-400">Login to place order</p>
      <NavLink to={"/customer/login"}>
        <button
          onMouseEnter={() => setLoginMsg(true)}
          onMouseLeave={() => setLoginMsg(false)}
          onClick={() => setLoginMsg(false)}
          className="standard-btn w-32"
        >
          Login
        </button>
      </NavLink>
    </>
  );
};

export default LoginBtn;
