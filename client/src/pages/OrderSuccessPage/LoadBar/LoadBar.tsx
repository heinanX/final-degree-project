import { LiaShippingFastSolid } from "react-icons/lia";
import "./LoadBar.css";

const LoadBar = () => {
  return (
    <div className=" text-white flex flex-col items-center gap-2 py-16">
      <div className="animate">
        <LiaShippingFastSolid />
      </div>
      <p>Loading</p>
    </div>
  );
};

export default LoadBar;