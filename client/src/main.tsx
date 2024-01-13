import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import ProductProvider from "./contexts/product.context.tsx";
import CustomerProvider from "./contexts/customer.context.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <CustomerProvider>
      <ProductProvider>
        <App />
      </ProductProvider>
    </CustomerProvider>
  </BrowserRouter>
);
