import { NavLink } from "react-router-dom";

interface props {
    setMsg: React.Dispatch<React.SetStateAction<boolean>>
}

const LoginBtn = ({setMsg}: props) => {
  return (
    <>
      <p className="text-md pr-6 text-red-400">Login to place order</p>
      <NavLink to={"/customer/login"}>
        <button
          onMouseEnter={() => setMsg(true)}
          onMouseLeave={() => setMsg(false)}
          onClick={() => setMsg(false)}
          className="standard-btn w-32"
        >
          Login
        </button>
      </NavLink>
    </>
  );
};

export default LoginBtn;
