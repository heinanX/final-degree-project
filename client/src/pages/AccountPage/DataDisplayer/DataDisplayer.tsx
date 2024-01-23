
import AccountSettings from "./ListItems/Account.settings";
import AddProduct from "./ListItems/Add.product";
import AllProducts from "./ListItems/All.products";
import DeleteProduct from "./ListItems/Delete.product";
import MyOrders from "./ListItems/My.orders";
import UpdateProduct from "./ListItems/Update.product";

interface dataDisplayerProps {
    displayComponent: string
}

const DataDisplayer = ({displayComponent}: dataDisplayerProps) => {

  return (
    <div className="right bg-red-200 w-full sm:w-2/3 p-5">
      <div id="data-display-header" className="uppercase px-2 py-4 h-10">
        <p>header goes here</p>
      </div>
      <div id="data-display-list-item" className="px-2 py-4 flex flex-col justify-center items-center">
      {displayComponent === 'myorders' ? <MyOrders /> : <></>}
      {displayComponent === 'accountsettings' ? <AccountSettings /> : <></>}
      {displayComponent === 'allproducts' ? <AllProducts /> : <></>}
      {displayComponent === 'addproduct' ? <AddProduct /> : <></>}
      {displayComponent === 'updateproduct' ? <UpdateProduct /> : <></>}
      {displayComponent === 'deleteproduct' ? <DeleteProduct /> : <></>}
      </div>
    </div>
  );
};

export default DataDisplayer;
