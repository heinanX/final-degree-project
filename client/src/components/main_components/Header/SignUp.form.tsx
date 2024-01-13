import { useState } from "react";
import { useSocket as customerSocket } from "../../../contexts/customerContext";
interface props {
  handleSwitch: () => void;
}

const SignUpForm = ({ handleSwitch }: props) => {
  const [newMail, setNewMail] = useState<string>("");
  const [newPass, setNewPass] = useState<string>("");
  const [tickedBox, setTickedBox] = useState<boolean>(false);
  const { signUp } = customerSocket();

  const saveToState = (
    setState: React.Dispatch<React.SetStateAction<string>>,
    value: string
  ) => {
    setState(value);
  };

  const handleSignUp = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!tickedBox) return alert("Oops! You must agree to our T's & C's first");
    signUp(newMail, newPass);
  };

  return (
    <form
      className="bg-red-200 py-4 px-2 flex flex-col items-end gap-1 rounded-sm text-sm"
      onSubmit={(e) => handleSignUp(e)}
    >
      <span>
        <label className="pl-1">Enter Email</label>
        <input
          type="text"
          className="standard-input"
          placeholder="user@mail.com"
          onChange={(e) => saveToState(setNewMail, e.target.value)}
        />
      </span>
      <span>
        <label className="text-sm pl-1">Enter Password</label>
        <input
          type="password"
          className="standard-input"
          placeholder="passowrd"
          onChange={(e) => saveToState(setNewPass, e.target.value)}
        />
      </span>
      <span className="text-10px flex flex-row gap-1 pl-2 text-left w-full">
        <input type="checkbox" onChange={() => setTickedBox(!tickedBox)} />
        <p>I agree to Terms & Conditions</p>
      </span>
      <span className="text-10px flex flex-row gap-1 pl-2 text-left w-full">
        <p>Already a customer?</p>
        <button
          className="text-red-800 hover:text-blue-600"
          onClick={handleSwitch}
        >
          Go back
        </button>
      </span>
      <button className="standard-btn w-1/2 mt-2 mr-1" type="submit">
        Sign Up
      </button>
    </form>
  );
};

export default SignUpForm;
