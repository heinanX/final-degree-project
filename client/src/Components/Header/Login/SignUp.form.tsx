import { useState } from "react";
import { useSocket as customerSocket } from "../../../contexts/customer.context";

// Interface defining the props for SignUpForm component
interface Props {
  handleSwitch: () => void;
}

/* A COMPONENT THAT RENDERS SIGN-UP FORM */
const SignUpForm = ({ handleSwitch }: Props) => {
  // state variables for email, password, and checkbox
  const [newMail, setNewMail] = useState<string>("");
  const [newPass, setNewPass] = useState<string>("");
  const [tickedBox, setTickedBox] = useState<boolean>(false);
  // accessing signUp function from customerSocket
  const { signUp } = customerSocket();

  // function to update state based on input value
  const saveToState = (
    setState: React.Dispatch<React.SetStateAction<string>>,
    value: string
  ) => {
    setState(value);
  };

  // function to handle form submission
  const handleSignUp = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // checks if checkbox is ticked
    if (!tickedBox) return alert("Oops! You must agree to our T's & C's first");
    // call signUp function with new email and password
    signUp(newMail, newPass);
  };

  return (
    <form onSubmit={(e) => handleSignUp(e)}>
      {/* email input field */}
      <div className="flex flex-col pb-2">
        <label className="pl-1 pb-1">Enter Email</label>
        <input
          type="text"
          className="standard-input"
          placeholder="user@mail.com"
          onChange={(e) => saveToState(setNewMail, e.target.value)}
        />
      </div>
      {/* password input field */}
      <div className="flex flex-col pb-2">
        <label className="pl-1 pb-1">Enter Password</label>
        <input
          type="password"
          className="standard-input"
          placeholder="password"
          onChange={(e) => saveToState(setNewPass, e.target.value)}
        />
      </div>
      {/* checkbox for agreeing to terms and conditions */}
      <div className="text-10px flex flex-row gap-1 pl-2 text-left w-full">
        <input type="checkbox" onChange={() => setTickedBox(!tickedBox)} />
        <p>I agree to Terms & Conditions</p>
      </div>
      {/* link to switch to sign-in form */}
      <div className="text-10px flex flex-row gap-1 pl-2 text-left w-full">
        <p>Already a customer?</p>
        <button
          className="text-red-800 hover:text-blue-600"
          onClick={handleSwitch}
        >
          Go back
        </button>
      </div>
      {/* submit button */}
      <div className="w-full flex justify-end">
        <button className="standard-btn w-1/2 mt-2 mr-1" type="submit">
          Sign Up
        </button>
      </div>
    </form>
  );
};

export default SignUpForm;
