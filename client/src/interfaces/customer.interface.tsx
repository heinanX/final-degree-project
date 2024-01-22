/* eslint-disable @typescript-eslint/no-unused-vars */
export interface CustomerContext {
    isLoggedIn: boolean;
    setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
    login: (mail: string, pass: string) => Promise<void>;
    signUp: (mail: string, pass: string) => Promise<void>;
    logOut: () => Promise<void>;
    checkLoginStatus: () => Promise<void>;
    activeCustomer: string;
    fetchCustomerDetails: () => void;
  }

  export const defaultValues = {
    isLoggedIn: false,
    setIsLoggedIn: () => {},
    login: async (mail: string, pass: string) => {},
    signUp: async (mail: string, pass: string) => {},
    logOut: async () => {},
    checkLoginStatus: async () => {},
    activeCustomer: '',
    fetchCustomerDetails: () => {}
  };