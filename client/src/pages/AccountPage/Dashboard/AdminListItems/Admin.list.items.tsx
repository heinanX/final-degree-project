interface AdminListItemsProps {
  handleDisplayComment: (component: string) => void;
}

/* 
  COMPONENT THAT RENDERS OUT ADDITIONAL LIST ACTIONS AVAILABLE FOR ADMINS
  - passed prop sets value of state [displayComponent] that renders said component
*/

const AdminListItems = ({ handleDisplayComment }: AdminListItemsProps) => {
  return (
    <ul className="bg-teal-800 py-2 px-1 mt-2">
      <h5>Database:</h5>
      <div className="bg-teal-600 w-1/2 h-px"></div>
      <li onClick={() => handleDisplayComment("orders")}>Orders</li>
      <li onClick={() => handleDisplayComment("products")}>Products</li>
      <li onClick={() => handleDisplayComment("add product")}>Add product</li>
      <li onClick={() => handleDisplayComment("delete product")}>
        Delete Product
      </li>
    </ul>
  );
};

export default AdminListItems;
