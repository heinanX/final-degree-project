import { useState } from "react";

const useSwitchForms = () => {
  const [showSignUp, setShowSignUp] = useState<boolean>(false);

  const handleSwitch = () => {
    console.log('jella');
    
    setShowSignUp(!showSignUp);
  };

  return { showSignUp, handleSwitch };
};

export default useSwitchForms;
