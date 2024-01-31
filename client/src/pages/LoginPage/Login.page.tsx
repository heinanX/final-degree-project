import { useEffect } from "react";
import SignInForm from "../../Components/Header/Login/SignIn.form";
import SignUpForm from "../../Components/Header/Login/SignUp.form";
import useSwitchForms from "../../customHooks/switchLoginForms";
import { useSocket as customerSocket } from "../../contexts/customer.context";

/* 
  LOGIN PAGE COMPONENT FOR DISPLAYING SIGN-IN AND SIGN-UP FORMS 
  - Checks if the user is already logged in, redirects to account page if true.
  - Conditionally renders sign-in or sign-up form based on state.
*/

const LoginPage = () => {
  // Destructure state and functionality from custom hook that handles form switch
  const { showSignUp, handleSwitch } = useSwitchForms();
  const { isLoggedIn, loadingIsLoggedIn } = customerSocket();

  // useEffect hook to check and redirect if the user is already logged in
  useEffect(() => {
    if (!loadingIsLoggedIn && isLoggedIn) {
      window.location.href = "/customer/account";
    }
  }, [loadingIsLoggedIn, isLoggedIn]);

  // Main component rendering
  return (
    loadingIsLoggedIn || isLoggedIn && !loadingIsLoggedIn ? (
      // If logged in, return an empty fragment (no need to render the login page)
      <></>
    ) : (
      // If not logged in
      <div className="w-2/3 border border-teal-600 py-20 px-24">
        <div className="py-4 px-3 flex justify-center text-sm">
          {/* Conditionally renders sign-in or sign-up form based on state */}
          {showSignUp ? (
            <SignUpForm handleSwitch={handleSwitch} />
          ) : (
            <SignInForm handleSwitch={handleSwitch} />
          )}
        </div>
      </div>
    )
  );
};

export default LoginPage;
