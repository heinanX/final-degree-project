import SignUpForm from "./SignUp.form";
import SignInForm from "./SignIn.form";
import useSwitchForms from "../../../customHooks/switchLoginForms";

/* A COMPONENT THAT RENDERS EITHER SIGN-IN OR SIGN-UP FORM */

const LoginForm = () => {
  const { showSignUp, handleSwitch } = useSwitchForms();

  return (
    <div className="absolute top-8 right-0">
      <div className="bg-red-200 py-4 px-3 flex flex-col items-end gap-1 rounded-sm text-sm">
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
