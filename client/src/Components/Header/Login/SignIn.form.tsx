import { useSocket as customerSocket } from "../../../contexts/customer.context";
import { useState } from "react";

interface FormProps {
  handleSwitch: () => void;
}

 /* A COMPONENT THAT RENDERS SIGN-IN FORM */

const SignInForm = ({ handleSwitch }: FormProps) => {
  const [custMail, setCustMail] = useState<string>("");
  const [custPass, setCustPass] = useState<string>("");
  const { login } = customerSocket();

  // function to update state based on input value
  const saveToState = (
    setState: React.Dispatch<React.SetStateAction<string>>,
    value: string
  ) => {
    setState(value);
  };

  // function to handle form submission
  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login(custMail, custPass);
  };

  return (
    <form onSubmit={(e) => handleLogin(e)}>
      
      {/* email input field */}
      <div className="flex flex-col pb-2">
        <label className="pl-1">Email</label>
        <input
          className="standard-input"
          type="text"
          onChange={(e) => saveToState(setCustMail, e.target.value)}
        />
      </div>

      {/* password input field */}
      <div className="flex flex-col pb-2">
        <label className="text-sm pl-1">Password</label>
        <input
          className="standard-input"
          type="password"
          onChange={(e) => saveToState(setCustPass, e.target.value)}
        />
      </div>

      {/* link to switch to sign-up form */}
      <div className="text-10px flex flex-row gap-1 pl-2 text-left w-full">
        <p>Not a customer yet?</p>
        <button
          className="text-red-800 hover:text-blue-600"
          type="button"
          onClick={handleSwitch}
        >
          sign up
        </button>
      </div>

      {/* submit button */}
      <div className="w-full flex justify-end">
        <button className="standard-btn w-1/2 mt-2 mr-1" type="submit">
          Login
        </button>
      </div>
    </form>
  );
};

export default SignInForm;
