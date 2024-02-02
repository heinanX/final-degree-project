import { useEffect, useState } from "react";
import AdminDashboard from "./Dashboard/AdminDashboard/Admin.dashboard";
import AdminListItems from "./Dashboard/AdminListItems/Admin.list.items";
import DataDisplayer from "./DataDisplayer/DataDisplayer";
import UserDashboard from "./Dashboard/UserDashboard/UserDashboard";
import UserListItems from "./Dashboard/UserListItems/User.list.items";
import { useSocket as orderSocket } from "../../contexts/order.context";
import { useSocket as productSocket } from "../../contexts/product.context";
import { useSocket as customerSocket } from "../../contexts/customer.context";
import "./accountPage.css";

/* A COMPONENT THAT RENDERS OUT THE BASE OF ACCOUNT PAGE */

const AccountPage = () => {
  // Destructuring necessary functionality from the context hooks
  const [displayComponent, setDistplayComponent] = useState<string>("");
  const { viewOrderDetails, setViewOrderDetails } = orderSocket();
  const { viewProductDetails, setViewProductDetails } = productSocket();
  const {
    isLoggedIn,
    isAdmin,
    loadingIsLoggedIn,
    showLoginDrawer,
    setShowLoginDrawer,
  } = customerSocket();

  // Function to handle changing the displayed component
  const handleDisplayComment = (component: string) => {
    if (viewOrderDetails || viewProductDetails) {
      // Close order and product details if they are open
      setViewOrderDetails(null);
      setViewProductDetails(null);
    }
    // Set the new component to be displayed
    setDistplayComponent(component);
  };

  // Effect to check if the user is logged in and redirect if not
  useEffect(() => {
    if (!loadingIsLoggedIn && !isLoggedIn) {
      window.location.href = "/customer/login";
    }
  }, [loadingIsLoggedIn]);

   // Effect that closes login drawer upon component load
  useEffect(() => {
    if (showLoginDrawer) {
      setShowLoginDrawer(!showLoginDrawer);
    }
  },[]);

  return (
    <>
      {isLoggedIn ? (
        <div className="mt-20 w-full p-6 flex justify-center">
          <div
            id="account-page-border-div"
            className="border border-teal-600 flex flex-col sm:flex-row w-full max-w-7xl"
          >
            {/* Left side content */}
            <div className="w-full sm:w-1/3 p-5 md:p-10 uppercase tracking-widest">
              {/* Display appropriate dashboard based on user type */}
              {isAdmin ? <AdminDashboard /> : <UserDashboard />}
              <ul className="account-page-ul pb-20">
                <UserListItems handleDisplayComment={handleDisplayComment} />
                {/* Display additional list items for admin */}
                {isAdmin ? (
                  <AdminListItems handleDisplayComment={handleDisplayComment} />
                ) : (
                  <></>
                )}
              </ul>
            </div>

            {/* right side content */}
            <DataDisplayer displayComponent={displayComponent} />
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default AccountPage;
