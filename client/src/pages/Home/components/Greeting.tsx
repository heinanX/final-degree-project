import logo from "../../../assets/images/vhs-tape-logo-outline.png";

/* A COMPONENT THAT RENDERS OUT A STORE GREETING */

const Greeting = () => {
  return (
    // container for the greeting section, with flex layout for responsiveness
    <div className="w-full flex flex-col md:flex-row">

      {/* left side of the greeting section containing the logo */}
      <div className="w-full md:w-2/5 flex justify-center items-center px-10 py-5 md:py-10 md:pl-10 md:pr-0">
        <img src={logo} alt="videoShack logo" />
      </div>

      {/* right side of the greeting section containing text content */}
      <div className="w-full md:w-3/5 text-center text-vhsBlue font-semibold flex flex-col justify-center items-center gap-1 px-10 pb-8 md:py-8 ">
        <h1 className="text-5xl xl:text-7xl">Your no. 01</h1>
        <h1 className="text-5xl xl:text-7xl">video rental store</h1>

        {/* list of services offered with VHS, VCR, and Digital Rentals */}
        <span className="flex flex-col sm:flex-row sm:gap-4 pt-4 justify-center font-normal text-white">
          <p>• VHS Rentals</p>
          <p>• VCR Rentals </p>
          <p>• Digital Rentals </p>
        </span>

        {/* additional information */}
        <div>
          <p className="pt-4 text-sm text-white">
            Order online by 4 pm for Early Bird delivery the next morning or
            visit us at Götgatan 33
          </p>
        </div>
      </div>
    </div>
  );
};

export default Greeting;
