export interface CustomerContext {
    loginVisibility: boolean;
    setLoginVisibility: React.Dispatch<React.SetStateAction<boolean>>;
    signUpVisibility: boolean;
    setSignUpVisibility: React.Dispatch<React.SetStateAction<boolean>>;
    isLoggedIn: boolean;
    setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
    login: (mail: string, pass: string) => Promise<void>;
    signUp: (uname: string, mail: string, pass: string) => Promise<void>;
    logOut: () => Promise<void>;
    checkLoginStatus: () => Promise<void>;
  }