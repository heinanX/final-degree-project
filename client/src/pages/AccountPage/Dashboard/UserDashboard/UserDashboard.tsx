import profilePic from "../../../../assets/images/profile-picture.png";

/* A COMPONENT THAT RENDERS OUT THE IMAGE OF AN ADMIN
  - it also leaves space for future elements associated with an user
*/
const UserDashboard = () => {
  return (
    <div className=" w-full text-sm flex flex-col items-center">
      <img src={profilePic} alt="" className="w-64 py-10" />
    </div>
  );
};

export default UserDashboard;
