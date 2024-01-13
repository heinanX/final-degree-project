import { useState } from "react";
import { useSocket as customerSocket } from "../../../contexts/customerContext";
import SignUpForm from "./SignUp.form";

const LoginForm = () => {
  const [custMail, setCustMail] = useState<string>("");
  const [custPass, setCustPass] = useState<string>("");
  const [showSignUp, setShowSignUp] = useState<boolean>(false);
  const { login } = customerSocket();

  const saveToState = (
    setState: React.Dispatch<React.SetStateAction<string>>,
    value: string
  ) => {
    setState(value);
  };

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login(custMail, custPass);
  };

  const handleSwitch = (
    ) => {
        setShowSignUp(!showSignUp)
    };

  return (
    <div className="absolute top-8 right-0">
      {showSignUp ? (
        <SignUpForm handleSwitch={handleSwitch} />
      ) : (
        <form
          className="bg-red-200 py-4 px-2 flex flex-col items-end gap-1 rounded-sm text-sm"
          onSubmit={(e) => handleLogin(e)}
        >
          <span>
            <label className="pl-1">Email</label>
            <input
              className="standard-input"
              type="text"
              onChange={(e) => saveToState(setCustMail, e.target.value)}
            />
          </span>
          <span>
            <label className="text-sm pl-1">Password</label>
            <input
              className="standard-input"
              type="password"
              onChange={(e) => saveToState(setCustPass, e.target.value)}
            />
          </span>
          <span className="text-10px flex flex-row gap-1 pl-2 text-left w-full">
            <p>Not a customer yet?</p>
            <button className="text-red-800 hover:text-blue-600" onClick={handleSwitch}>
              sign up
            </button>
          </span>
          <button className="standard-btn w-1/2 mt-2 mr-1" type="submit">
            Login
          </button>
        </form>
      )}
    </div>
  );
};

export default LoginForm;
