import { useState } from "react";

const LoginForm = () => {
    const [custMail, setCustMail] = useState<string>();
    const [custPass, setCustPass] = useState<string>();

    const saveToState = (setState : React.Dispatch<React.SetStateAction<string | undefined>>, value: string) => {
        setState(value)
        console.log('mail', custMail);
        console.log('pass', custPass);
    
    }

  return (
    <div className="absolute top-8 right-0">
      <form className="bg-red-200 py-4 px-2 flex flex-col items-end gap-1 rounded-sm text-sm">
        <span>
          <label className="pl-1">Email</label>
          <input className="standard-input" type="text" onChange={(e) => saveToState(setCustMail, e.target.value)} />
        </span>
        <span>
          <label className="text-sm pl-1">Password</label>
          <input className="standard-input" type="password" onChange={(e) => saveToState(setCustPass, e.target.value)}  />
        </span>
        <button className="standard-btn w-1/2 mt-2 mr-1">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
