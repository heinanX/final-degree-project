export interface CustomerContext {
  isLoggedIn: boolean;
  isAdmin: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  login: (mail: string, pass: string) => Promise<void>;
  signUp: (mail: string, pass: string) => Promise<void>;
  logOut: () => Promise<void>;
  checkLoginStatus: () => Promise<void>;
  loadingIsLoggedIn: boolean;
  setLoadingIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  showLoginDrawer: boolean;
  setShowLoginDrawer: React.Dispatch<React.SetStateAction<boolean>>;
  activeCustomer: string;
}


export const defaultValues = {
  isLoggedIn: false,
  setIsLoggedIn: () => {},
  isAdmin: false,
  setIsAdmin: () => {},
  login: async () => {},
  signUp: async () => {},
  logOut: async () => {},
  checkLoginStatus: async () => {},
  loadingIsLoggedIn: true,
  setLoadingIsLoggedIn: () => {},
  showLoginDrawer: false,
  setShowLoginDrawer: () => {},
  activeCustomer: ""
};
