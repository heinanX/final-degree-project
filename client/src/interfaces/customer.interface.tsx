export interface CustomerContext {
    isLoggedIn: boolean;
    setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
    login: (mail: string, pass: string) => Promise<void>;
    signUp: (mail: string, pass: string) => Promise<void>;
    logOut: () => Promise<void>;
    checkLoginStatus: () => Promise<void>;
  }