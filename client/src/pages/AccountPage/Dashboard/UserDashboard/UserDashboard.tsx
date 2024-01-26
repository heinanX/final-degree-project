import profilePic from '../../../../assets/images/profile-picture.png'

const UserDashboard = () => {
  return (
    <div className=" w-full text-sm flex flex-col items-center">
      <img src={profilePic} alt="" className="w-64 py-10" />
      <h5 className="py-2">active rentals:</h5>
      {/* add a map here that goes through an active rental. */}
{/*       <ul>
        <li></li>
      </ul> */}
    </div>
  );
};

export default UserDashboard;
