interface AdminListItemsProps {
  setDistplayComponent: (data: string) => void;
}

/* 
  COMPONENT THAT RENDERS OUT ADDITIONAL LIST ACTIONS AVAILABLE FOR ADMINS
  - passed prop sets value of state [displayComponent] that renders said component
*/

const AdminListItems = ({ setDistplayComponent }: AdminListItemsProps) => {
  return (
    <ul className="bg-teal-800 py-2 px-1 mt-2">
      <h5>Database:</h5>
      <div className="bg-teal-600 w-1/2 h-px"></div>
      <li onClick={() => setDistplayComponent("orders")}>Orders</li>
      <li onClick={() => setDistplayComponent("products")}>Products</li>
      <li onClick={() => setDistplayComponent("add product")}>Add product</li>
      <li onClick={() => setDistplayComponent("update product")}>
        Update Product
      </li>
      <li onClick={() => setDistplayComponent("delete product")}>
        Delete Product
      </li>
    </ul>
  );
};

export default AdminListItems;
