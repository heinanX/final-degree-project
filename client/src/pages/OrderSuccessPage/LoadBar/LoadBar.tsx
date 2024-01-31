import { LiaShippingFastSolid } from "react-icons/lia";
import "./LoadBar.css";

/* LOAD BAR FOR WHEN AN ORDER IS BEING CREATED IN BACKEND */

const LoadBar = () => {
  return (
    <div className="font-notoSans text-white w-full flex flex-col items-center text-center gap-2">
      <div className="animate">
        {/* icon of truck */}
        <LiaShippingFastSolid />
      </div>
      {/* loading statement */}
      <p className="w-3/5">Processing and collecting order information</p>
    </div>
  );
};

export default LoadBar;
