import adImage from "../../../assets/images/vcr-image-flipped.png";

/* A COMPONENT THAT RENDERS AD SPACE
  - currently occupied by an ad for vcr rentals. It is split into two parts in wider screen
*/
const AdSpaceHome = () => {
  return (
    <div className="w-full flex flex-col md:flex-row">
      
      {/* left div */}
      <div className="w-full md:w-1/2 flex flex-col bg-vhsBlue text-slate-800 text-center justify-center items-center p-8 text-notoSans">
        <h1 className="text-5xl font-bold uppercase">dont own a vcr?</h1>
        <h4 className="text-2xl">No worries, we've got you covered</h4>
        <h4 className="text-xl"># your local VideoShack</h4>
        <p className="pt-5">*coming soon to webshop</p>
      </div>

      {/* right div */}
      <div className="w-full md:w-1/2 flex items-center justify-center">
        <img
          src={adImage}
          alt="image of a vcr"
          className="w-4/5 max-w-96 md:max-w-none"
        />
      </div>
    </div>
  );
};

export default AdSpaceHome;
