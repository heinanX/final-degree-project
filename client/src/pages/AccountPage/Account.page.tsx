import { useState } from "react";
import AdminDashboard from "./AdminDashboard/Admin.dashboard";
import AdminListItems from "./AdminListItems/Admin.list.items";
import DataDisplayer from "./DataDisplayer/DataDisplayer";
import UserDashboard from "./UserDashboard/UserDashboard";
import "./accountPage.css";

const AccountPage = () => {
  const [ displayComponent, setDistplayComponent ] = useState<string>('');
  const isAdmin = true;
  // const dispdlayData = (data: string) => {
  //   console.log(data);
  // };

  return (
    <div className="mt-20 w-full p-6">
      <div id="account-page-border-div" className="border border-teal-600 flex flex-col sm:flex-row w-full max-w-7xl">
        
        {/* Left side content */}
        <div className="w-full sm:w-1/3 p-10 uppercase tracking-widest">
          {isAdmin ? <AdminDashboard /> : <UserDashboard />}
          <ul className="account-page-ul pb-20">
            <li onClick={() => setDistplayComponent("myorders")}>My Orders</li>
            <li onClick={() => setDistplayComponent("accountsettings")}>
              Account Settings
            </li>
            <li onClick={() => setDistplayComponent("logout")}>Log Out</li>
            {isAdmin ? <AdminListItems setDistplayComponent={setDistplayComponent} /> : <></>}
          </ul>
        </div>

        {/* right side content */}
        <DataDisplayer displayComponent={displayComponent} />
      </div>
    </div>
  );
};

export default AccountPage;
