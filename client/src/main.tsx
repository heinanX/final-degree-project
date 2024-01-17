import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import ProductProvider from "./contexts/product.context.tsx";
import CustomerProvider from "./contexts/customer.context.tsx";
import CartProvider from "./contexts/cart.context.tsx";
import CategoryProvider from "./contexts/category.context.tsx";
import TagProvider from "./contexts/tags.context.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <CustomerProvider>
      <CategoryProvider>
        <TagProvider>
          <ProductProvider>
            <CartProvider>
              <App />
            </CartProvider>
          </ProductProvider>
        </TagProvider>
      </CategoryProvider>
    </CustomerProvider>
  </BrowserRouter>
);
