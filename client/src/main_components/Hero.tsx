import { useEffect, useState } from "react";
import hero_1 from "../assets/images/ai-generated-hero.png";
import hero_2 from "../assets/images/ai-generated-hero_2.png";
import hero_4 from "../assets/images/ai-generated-hero_4.png";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const Hero = () => {
  const images = [hero_1, hero_2, hero_4];
  const [num, setNum] = useState(0);
  const [heroImage, setHeroImage] = useState(images[num]);


  const forward = () => {
    if (num >= images.length - 1) {
      setNum(0);
    } else {
      setNum(num + 1);
    }
    setHeroImage(images[num + 1] || images[0]);
  };

  const backwards = () => {
    if (num === 0) {
      setNum(images.length - 1);
    } else {
      setNum(num - 1);
    }
    setHeroImage(images[num - 1] || images[images.length - 1]);
  };

  function createDots() {
    return images.map((item, index) => (
      <div key={index} className={ `w-2 h-2  rounded-full ${num === index ? 'bg-cyan-700' : 'bg-white'}` } ></div>
    ));
  }
  
  useEffect(() => {
    const intervalId = setInterval(() => {
      forward();
    }, 8000);
  
    return () => clearInterval(intervalId);
  }, [num]);

  const arrowStyling =
    "absolute bottom-1/2 text-white hover:text-cyan-400 text-4xl drop-shadow-xl opacity-80";

  return (
    <div
      className="relative w-full h-533"
      style={{ backgroundImage: `url(${heroImage})`, height: "533px" }}
    >
      <button onClick={backwards} className={`${arrowStyling} left-10`}>
        {" "}
        <FaArrowLeft />{" "}
      </button>
      <button onClick={forward} className={`${arrowStyling} right-10`}>
        {" "}
        <FaArrowRight />{" "}
      </button>
      <div className="absolute bottom-6 right-1/2 flex gap-2">{createDots()}</div>
    </div>
  );
};

export default Hero;
