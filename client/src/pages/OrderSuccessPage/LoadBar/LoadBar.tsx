import { LiaShippingFastSolid } from "react-icons/lia";
import "./LoadBar.css";

/* LOAD BAR FOR WHEN AN ORDER IS BEING CREATED IN BACKEND */

const LoadBar = () => {
  return (
    <div className=" text-white flex flex-col items-center gap-2 w-48">
      <div className="animate">
        {/* icon of truck */}
        <LiaShippingFastSolid />
      </div>
      {/* loading statement */}
      <p>Loading</p>
    </div>
  );
};

export default LoadBar;
