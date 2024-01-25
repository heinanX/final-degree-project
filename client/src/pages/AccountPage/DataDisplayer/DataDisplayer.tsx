import AccountSettings from "./ListItems/Account.settings";
import AddProduct from "./ListItems/AddProduct/Add.product";
import AllOrders from "./ListItems/AllOrders/All.orders";
import AllProducts from "./ListItems/All.products";
import DeleteProduct from "./ListItems/Delete.product";
import MyOrders from "./ListItems/My.orders";
import UpdateProduct from "./ListItems/Update.product";
import { useState } from "react";
import { Product } from "../../../interfaces/product.interface";
import { Order } from "../../../interfaces/order.interface";
import ViewInDetail from "./viewInDetail/View.in.detail";

interface dataDisplayerProps {
  displayComponent: string;
}

const DataDisplayer = ({ displayComponent }: dataDisplayerProps) => {
  const [viewDetails, setViewDetails] = useState<Order | Product | null>(null);


  return (
    <div className="right w-full sm:w-2/3 p-5">
      {viewDetails? (
        <ViewInDetail
          viewDetails={viewDetails}
          setViewDetails={setViewDetails}
        />
      ) : (
        <>
          <div id="data-display-header" className="uppercase px-2 py-4 h-10">
            <p>{displayComponent}</p>
          </div>
          <div
            id="data-display-list-item"
            className="px-2 py-4 flex flex-col justify-center items-center"
          >
            {displayComponent === "my orders" ? <MyOrders /> : <></>}
            {displayComponent === "account settings" ? (
              <AccountSettings />
            ) : (
              <></>
            )}
            {displayComponent === "products" ? (
              <AllProducts
                displayComponent={displayComponent}
                viewDetails={viewDetails}
                setViewDetails={setViewDetails}
              />
            ) : (
              <></>
            )}
            {displayComponent === "add product" ? <AddProduct /> : <></>}
            {displayComponent === "update product" ? <UpdateProduct /> : <></>}
            {displayComponent === "delete product" ? <DeleteProduct /> : <></>}
            {displayComponent === "orders" ? (
              <AllOrders
                displayComponent={displayComponent}
                viewDetails={viewDetails}
                setViewDetails={setViewDetails}
              />
            ) : (
              <></>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default DataDisplayer;
