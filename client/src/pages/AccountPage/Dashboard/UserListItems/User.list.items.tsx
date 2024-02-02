import { useSocket as customerSocket } from "../../../../contexts/customer.context";

interface UserListItemsProp {
    handleDisplayComment: (component: string) => void;
}

/* LIST ITEMS THAT ARE VISIBLE TO ALL USERS */

const UserListItems = ({ handleDisplayComment }: UserListItemsProp) => {

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

export default UserListItems;
