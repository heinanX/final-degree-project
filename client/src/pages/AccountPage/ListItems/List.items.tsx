import { useSocket as customerSocket } from "../../../contexts/customer.context";

interface ListItemsProp {
    handleDisplayComment: (component: string) => void;
}
const ListItems = ({ handleDisplayComment }: ListItemsProp) => {

    const { logOut } = customerSocket();
    
  return (
    <>
      <li onClick={() => handleDisplayComment("my orders")}>My Orders</li>
      <li onClick={() => handleDisplayComment("account settings")}>
        Account Settings
      </li>
      <li onClick={logOut}>Log Out</li>
    </>
  );
};

export default ListItems;
