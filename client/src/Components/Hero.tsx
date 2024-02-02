import { useEffect, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import hero_1 from "../assets/images/ai-generated-hero.png";
import hero_2 from "../assets/images/ai-generated-hero_2.png";
import hero_3 from "../assets/images/ticket-hero.png";
import hero_4 from "../assets/images/ai-generated-hero_4.png";

/* A Hero component displaying a carousel of images with navigation arrows and dots */

const Hero = () => {
  const images = [hero_1, hero_2, hero_3, hero_4];

  const [num, setNum] = useState(0);
  const [heroImage, setHeroImage] = useState(images[num]);

  // Function to navigate forward in the carousel
  const forward = () => {
    if (num >= images.length - 1) {
      setNum(0);
    } else {
      setNum(num + 1);
    }
    setHeroImage(images[num + 1] || images[0]);
  };

  // Function to navigate backward in the carousel
  const backwards = () => {
    if (num === 0) {
      setNum(images.length - 1);
    } else {
      setNum(num - 1);
    }
    setHeroImage(images[num - 1] || images[images.length - 1]);
  };

  // Function to create navigation dots based on the number of images
  function createDots() {
    return images.map((item, index) => (
      <div
        key={index}
        className={`w-2 h-2  rounded-full ${
          num === index ? "bg-cyan-700" : "bg-white"
        }`}
      ></div>
    ));
  }

  // Effect to auto-forward the carousel every 8 seconds
  useEffect(() => {
    const intervalId = setInterval(() => {
      forward();
    }, 8000);

    return () => clearInterval(intervalId);
  }, [num]);

  const arrowStyling =
    "absolute bottom-1/2 text-white hover:text-cyan-400 text-xl opacity-50 hover:bg-white hover:p-2 hover:rounded-full";

  return (
    <div className="relative w-full flex justify-center">
      <img src={heroImage} className="w-full" alt="pancake" />
      <button onClick={backwards} className={`${arrowStyling} left-6`}>
        <FaArrowLeft />
      </button>
      <button onClick={forward} className={`${arrowStyling} right-6`}>
        <FaArrowRight />
      </button>
      <div className="absolute bottom-6 right-1/2 flex gap-2">{createDots()}</div>
    </div>
  );
};

export default Hero;
