/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { PropsWithChildren, createContext, useContext, useEffect, useState } from "react";
import { CustomerContext, defaultValues } from "../interfaces/customer.interface";
import { useNavigate } from "react-router-dom";

export const CustomerContextValues =
  createContext<CustomerContext>(defaultValues);
export const useSocket = () => useContext(CustomerContextValues);

function CustomerProvider({ children }: PropsWithChildren) {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [activeCustomer, setActiveCustomer] = useState<string>('');
  const navigate = useNavigate();


  // LOG IN FUNCTION THAT ACCEPTS 2 PARAMETERS FROM COMPONENT Login.form
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
        setIsLoggedIn(true);
        setIsAdmin(data.isAdmin)
        console.log(data);
        navigate('/customer/account')
      } else {
        alert("incorrect mail or password");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // SIGN UP FUNCTION THAT ACCEPTS 2 PARAMETERS FROM COMPONENT SignUp.form
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
        console.log(data);

        //add 'customer reward' Issue logic here

      } else {
        alert("user already exists");
      }
    } catch (error) {
      console.log("Sign up failed");
    }
  };

  // LOGOUT FUNCTION THAT SENDS A POST TO LOGOUT ENDPOINT, IF OK, CUSTOMER HAS LOGGED OUT
  const logOut = async () => {
    try {
      const res = await fetch("/api/customers/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      });
      const data = await res.json();

      if (res.ok) {
        console.log(data);
        setIsLoggedIn(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // FUNCTION THAT CHECKS FOR USER IN SESSION.
  const checkLoginStatus = async () => {
    try {
      const res = await fetch("/api/customers/active");
      const data = await res.json()
      if (res.ok) {
        if (!isLoggedIn) return setIsLoggedIn(true);

        return data;
      }
    } catch (error) {
      console.error(error)
    }
  };

    // A FUNCTION THAT FETCHES CUSTOMER'S DETAILS 
    const fetchCustomerDetails = async () => {
      try {
        const res = await fetch("/api/customers/customer-details");
        const data = await res.json();
        setActiveCustomer(data)
        setIsAdmin(data.isAdmin)
      return data;    
      } catch (err) {
        if (err instanceof Error) {
          console.error("Error fetching product", err.message);
        }
      }
    };

  useEffect(()=> {
    checkLoginStatus();
  },[])

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
        activeCustomer,
        fetchCustomerDetails
      }}
    >
      {children}
    </CustomerContextValues.Provider>
  );
}

export default CustomerProvider;
