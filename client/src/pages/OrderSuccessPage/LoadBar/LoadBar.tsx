import { LiaShippingFastSolid } from "react-icons/lia";
import "./LoadBar.css";

const LoadBar = () => {
  return (
    <div className=" text-white flex flex-col items-center gap-2 w-48">
      <div className="animate">
        <LiaShippingFastSolid />
      </div>
      <p>Loading</p>
    </div>
  );
};

export default LoadBar;
