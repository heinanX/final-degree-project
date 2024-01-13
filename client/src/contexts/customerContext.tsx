/* eslint-disable @typescript-eslint/no-unused-vars */
import { PropsWithChildren, createContext, useContext, useState } from "react";
import { CustomerContext } from "../interfaces/customerInterface";

const defaultValues = {
  loginVisibility: false,
  setLoginVisibility: () => {},
  signUpVisibility: false,
  setSignUpVisibility: () => {},
  isLoggedIn: false,
  setIsLoggedIn: () => {},
  login: async (mail: string, pass: string) => {},
  signUp: async (uname: string, mail: string, pass: string) => {},
  logOut: async () => {},
  checkLoginStatus: async () => {},
};

export const CustomerContextValues = createContext<CustomerContext>(defaultValues);
export const useSocket = () => useContext(CustomerContextValues);

function CustomerProvider({ children }: PropsWithChildren) {
  const [loginVisibility, setLoginVisibility] = useState<boolean>(false);
  const [signUpVisibility, setSignUpVisibility] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  // #LOG IN FUNCTION THAT TAKES IN 2 STRINGS FROM COMPONENT LOGINFORM
  const login = async (mail: string, pass: string) => {
    try {
      const res = await fetch("/api/customers/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mail: mail,
          password: pass,
        }),
      });
      if (res.ok) {
        setIsLoggedIn(true);

        loginVisibility ? setLoginVisibility(false) : null;
        signUpVisibility ? setSignUpVisibility(false) : null;
        const data = await res.json();
        console.log(data);
        
        //localStorage.setItem("customer", JSON.stringify(data.userObject));
      } else {
        alert("incorrect mail or password");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const signUp = async (uname: string, mail: string, pass: string) => {
    try {
      const res = await fetch("/api/customers/sign-up", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: mail,
          password: pass,
          description: uname,
        }),
      });
      if (res.ok) {
        loginVisibility ? setLoginVisibility(false) : null;
        signUpVisibility ? setSignUpVisibility(false) : null;
        
        setTimeout(() => {
          login(mail, pass);
          loginVisibility ? setLoginVisibility(false) : null;
        }, 1000);

      } else {
        alert("user already exists");
      }
    } catch (error) {
      console.log("Sign up failed");
    }
  };

  const logOut = async () => {
    try {
      const res = await fetch("api/customers/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      });
      
      localStorage.removeItem("customer");
      setIsLoggedIn(false);
    } catch (error) {
      console.log(error);
    }
  };

  const checkLoginStatus = async () => {
    try {
      const res = await fetch("api/customers/auth");
      const data = await res.json();
      if (res.ok) {
        setIsLoggedIn(true);
        !localStorage.getItem("customer")
          ? localStorage.setItem("customer", JSON.stringify(data))
          : null;
      }
    } catch (error) {
      return;
    }
  };

  return (
    <CustomerContextValues.Provider
      value={{
        loginVisibility,
        setLoginVisibility,
        signUpVisibility,
        setSignUpVisibility,
        isLoggedIn,
        setIsLoggedIn,
        login,
        signUp,
        logOut,
        checkLoginStatus,
      }}
    >
      {children}
    </CustomerContextValues.Provider>
  );
}

export default CustomerProvider;