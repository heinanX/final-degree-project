import SignInForm from "../../Components/Header/Login/SignIn.form";
import SignUpForm from "../../Components/Header/Login/SignUp.form";
import useSwitchForms from "../../customHooks/switchLoginForms";

/* LOGIN PAGE COMPONENT FOR DISPLAYING SIGN-IN AND SIGN-UP FORMS */

const LoginPage = () => {

  // destructures state and functionality from custom hook that handles form switch
  const { showSignUp, handleSwitch } = useSwitchForms();

  return (
    <div className="w-2/3 border border-teal-600 py-20 px-24">
      <div className="py-4 px-3 flex justify-center text-sm">

        {/* conditionally renders sign-in or sign-up form based on state */}
        {showSignUp ? (
          <SignUpForm handleSwitch={handleSwitch} />
        ) : (
          <SignInForm handleSwitch={handleSwitch} />
        )}

      </div>
    </div>
  );
};

export default LoginPage;
