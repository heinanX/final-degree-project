/* A COMPONENT THAT RENDERS OUT FOOTER SECTION ON WEBPAGE
  - it's divided into 3 sections: store information, opening hours and social media
*/

const Footer = () => {
  return (
    <footer className="w-full text-white py-8">
      <div className="container mx-auto flex flex-wrap justify-evenly max-w-7xl p-10">

        {/* Column 1: Store Information */}
        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 mb-6 p-2 flex flex-col items-center">
          <h3 className="text-lg font-semibold mb-3">Store Information</h3>
          <p>Götgatan 33</p>
          <p>116 21 STOCKHOLM</p>
          <p>Mail: heyRental@videostore.se</p>
        </div>

        {/* Column 2: Opening Hours */}
        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 mb-6 p-2 flex flex-col items-center">
          <h3 className="text-lg font-semibold mb-3">Opening Hours</h3>
          <p>Mon - Fri: 10:00 AM - 11:00 PM</p>
          <p>Saturday: 11:00 AM - 6:00 PM</p>
          <p>Sunday: Closed</p>
        </div>

        {/* Column 3: Social Media */}
        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 mb-6 p-2 flex flex-col items-center">
          <h3 className="text-lg font-semibold mb-3">Follow Us</h3>
          <p>Instagram: @VideoStore</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
