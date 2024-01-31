import profilePic from "../../../../assets/images/admin-profile-picture.png";

/* A COMPONENT THAT RENDERS OUT THE IMAGE OF AN ADMIN
  - it also leaves space for future elements associated with an admin
*/

const AdminDashboard = () => {
  return (
    <div className="w-full text-sm flex justify-center">
      <img src={profilePic} alt="" className="w-64 py-5" />
    </div>
  );
};

export default AdminDashboard;
