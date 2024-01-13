
import { useEffect } from "react";
import Footer from "./components/main_components/Footer/Footer";
import Header from "./components/main_components/Header/Header";
import Router from "./components/main_components/Router";
import { useSocket as customerSocket } from "./contexts/customerContext";

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
