/* eslint-disable @typescript-eslint/no-unused-vars */

import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
// Importing necessary dependencies from React

import {
  CustomerContext,
  defaultValues,
} from "../interfaces/customer.interface";
// Importing custom types/interfaces from the customer interface file

import { useNavigate } from "react-router-dom";
// Importing the useNavigate hook for navigation in React Router

// Creating a context to manage customer-related state
export const CustomerContextValues =
  createContext<CustomerContext>(defaultValues);

// Custom hook to access the customer context
export const useSocket = () => useContext(CustomerContextValues);

function CustomerProvider({ children }: PropsWithChildren) {
  // Initializing state for customer-related information
  const [loadingIsLoggedIn, setLoadingIsLoggedIn] = useState<boolean>(true);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [activeCustomer, setActiveCustomer] = useState<string>("");
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [showLoginDrawer, setShowLoginDrawer] = useState<boolean>(false);
  const navigate = useNavigate();

  // Function to log in a customer
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
        const data = await res.json();
        if (showLoginDrawer) {
          return setShowLoginDrawer(!showLoginDrawer);
        }
        setIsLoggedIn(true);
        setIsAdmin(data.isAdmin);
        setActiveCustomer(data.mail)
        navigate("/customer/account");
      } else {
        alert("Incorrect email or password");
      }
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  // Function to sign up a new customer
  const signUp = async (mail: string, pass: string) => {
    try {
      const res = await fetch("/api/customers/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mail: mail,
          password: pass,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setIsLoggedIn(true);
        setIsAdmin(data.isAdmin);
        setActiveCustomer(data.mail)
      } else {
        alert("User already exists");
      }
    } catch (error) {
      console.error("Sign up failed", error);
    }
  };

  // Function to log out a customer
  const logOut = async () => {
    try {
      const res = await fetch("/api/customers/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      });
      if (res.ok) {
        setIsLoggedIn(false);
        setIsAdmin(false);
        setActiveCustomer("")
      }
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  // Function to check the login status of a customer
  const checkLoginStatus = async () => {
    try {
      const res = await fetch("/api/customers/active");
      const data: {mail: string, isAdmin: boolean} = await res.json();

      if (res.ok) {
        setIsLoggedIn(true);
        setIsAdmin(data.isAdmin);
        setActiveCustomer(data.mail)
        setLoadingIsLoggedIn(false);
      } else {
        setLoadingIsLoggedIn(false);
      }
    } catch (error) {
      console.error("Error checking login status", error);
    }
  };

  useEffect(() => {
    checkLoginStatus();
  }, [isLoggedIn]);

  // Render the CustomerContextValues.Provider with the customer-related functions and state as values
  return (
    <CustomerContextValues.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        isAdmin,
        login,
        signUp,
        logOut,
        checkLoginStatus,
        loadingIsLoggedIn,
        setLoadingIsLoggedIn,
        showLoginDrawer,
        setShowLoginDrawer,
        activeCustomer
      }}
    >
      {children}
    </CustomerContextValues.Provider>
  );
}

export default CustomerProvider;
