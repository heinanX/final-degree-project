import profilePic from "../../../assets/images/admin-profile-picture.png";

const AdminDashboard = () => {
  return (
    <div className="w-full text-sm flex justify-center">
      <img src={profilePic} alt="" className="w-64 py-5" />
    </div>
  );
};

export default AdminDashboard;
