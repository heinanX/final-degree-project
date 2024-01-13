
import { useEffect } from "react";
import Footer from "./Components/Footer/Footer";
import Header from "./Components/Header/Header";
import Router from "./Components/Router";
import { useSocket as customerSocket } from "./contexts/customer.context";

const App = () => {
  const { checkLoginStatus } = customerSocket();
  
  useEffect(()=> {
    checkLoginStatus();
  },[])

  return (
    <>
      <Header />
      <Router />
      <Footer />
    </>
  );
};

export default App;
