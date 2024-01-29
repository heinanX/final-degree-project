import { useState } from "react";

const useSwitchForms = () => {
  const [showSignUp, setShowSignUp] = useState<boolean>(false);

  const handleSwitch = () => {    
    setShowSignUp(!showSignUp);
  };

  return { showSignUp, handleSwitch };
};

export default useSwitchForms;
