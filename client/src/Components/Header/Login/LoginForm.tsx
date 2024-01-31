import SignUpForm from "./SignUp.form";
import SignInForm from "./SignIn.form";
import useSwitchForms from "../../../customHooks/switchLoginForms";

/* A COMPONENT THAT RENDERS EITHER SIGN-IN OR SIGN-UP FORM */

const LoginForm = () => {
  // destructures values from custom hook useSwitchForms
  const { showSignUp, handleSwitch } = useSwitchForms();

  return (
    <div className="absolute top-8 right-0">
      {/* container for login form with conditional rendering */}
      <div className="bg-red-200 py-4 px-3 flex flex-col items-end gap-1 rounded-sm text-sm">
        {/* renders either sign-up or sign-in form based on showSignUp */}
        {showSignUp ? (
          <SignUpForm handleSwitch={handleSwitch} />
        ) : (
          <SignInForm handleSwitch={handleSwitch} />
        )}
      </div>
    </div>
  );
};

export default LoginForm;
