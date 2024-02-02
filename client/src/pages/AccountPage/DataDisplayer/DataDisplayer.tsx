import AccountSettings from "./AccountSettings/Account.settings";
import AddProduct from "./products/AddProduct/Add.product";
import AllOrders from "./orders/All.orders";
import AllProducts from "./products/All.products";
import DeleteProduct from "./products/Delete.product";
import MyOrders from "./MyOrders/My.orders";
import { useSocket as orderSocket } from "../../../contexts/order.context";
import { useSocket as productSocket } from "../../../contexts/product.context";
import ViewInDetail from "./viewInDetail/View.in.detail";

interface dataDisplayerProps {
  displayComponent: string;
}

const DataDisplayer = ({ displayComponent }: dataDisplayerProps) => {
  const { viewOrderDetails } = orderSocket();
  const { viewProductDetails } = productSocket();

  return (
    <div id="DataDisplayer" className="right w-full sm:w-2/3 p-5">
      {viewOrderDetails || viewProductDetails ? (
        <ViewInDetail />
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
              <AllProducts displayComponent={displayComponent} />
            ) : (
              <></>
            )}
            {displayComponent === "add product" ? <AddProduct /> : <></>}
            {displayComponent === "delete product" ? <DeleteProduct /> : <></>}
            {displayComponent === "orders" ? (
              <AllOrders displayComponent={displayComponent} />
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
