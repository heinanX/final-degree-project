import { useState } from "react";
import { NavLink } from "react-router-dom";
import image404 from "../assets/images/404-img.png";
import image404_2 from "../assets/images/404-img_2.png";
import image404_3 from "../assets/images/404-img_3.png";

/* 
  A COMPONENT THAT RENDERS A 404 PAGE WITH MILD INTERACTION 
*/
const NotFoundPage = () => {
  
  const [currentIndex, setCurrentIndex] = useState(0);

  const errorImg = [image404_2, image404, image404_3];
  const errorMsg = [
    "Ah, you scared me! Are you lost too?",
    `Horrraaaa… you clicked it anyway!`,
    "awwe, I can't stay mad with you",
  ];

  // Function to handle button and update the current index
  const handleClick = () => {
    if (currentIndex < errorImg.length) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
    }
  };

  const errorBtn = [
    <button className="standard-btn mt-3 w-52" onClick={handleClick}>
      Don't press!
    </button>,
    <button className="standard-btn mt-3 w-52" onClick={handleClick}>
      Dare do it again...
    </button>,
    <NavLink to={"/"}>
      <button className="standard-btn mt-3 w-52">I feel lucky ♥</button>
    </NavLink>,
  ];

  return (
    <div className="flex flex-col items-center gap-8 border border-vhsBlue mx-6 px-6 py-10 lg:p-20">
      <img
        src={errorImg[currentIndex]}
        alt="404 hamster image"
        className="w-80"
      />

      {/* Section for the error message */}
      <div className="font-notoSans text-center">
        <h1 className="text-4xl lg:text-6xl text-center text-vhsPink font-bold">
          404 ERROR.
        </h1>
        <p className="text-base lg:text-3xl">{errorMsg[currentIndex]}</p>
      </div>
        {errorBtn[currentIndex]}
    </div>
  );
};

export default NotFoundPage;
