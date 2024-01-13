import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import ProductProvider from "./contexts/productContext.tsx";
import CustomerProvider from "./contexts/customerContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <CustomerProvider>
      <ProductProvider>
        <App />
      </ProductProvider>
    </CustomerProvider>
  </BrowserRouter>
);
