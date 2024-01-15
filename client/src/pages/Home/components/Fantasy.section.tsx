import { useEffect, useState } from "react";
import { useSocket as useSocketProducts } from "../../../contexts/product.context";

const FantasySection = () => {

  const { products } = useSocketProducts();
  let fantasy = products.slice(5,10)
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const handleResize = () => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  if (windowSize.width > 1220 ) {
    fantasy = products.slice(3,10)
  }
  if (windowSize.width < 1100 ) {
    fantasy = products.slice(5,10)
  }
  if (windowSize.width < 950 ) {
    fantasy = products.slice(6,10)
  }
  if (windowSize.width < 776 ) {
    fantasy = products.slice(7,10)
  }
  if (windowSize.width < 620 ) {
    fantasy = products.slice(8,10)
  }
  if (windowSize.width < 520 ) {
    fantasy = products.slice(9,10)
  }


  useEffect(() => {
    // Add event listener for window resize
    window.addEventListener('resize', handleResize);
    console.log(windowSize);
    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };

    
  }, [windowSize]);

  return (
    <div className="relative my-10 mx-16 border border-teal-700 h-60 flex flex-col justify-end rounded-sm">
      <div
        className="absolute border border-teal-700 px-10 text-teal-700 uppercase"
        style={{ top: "-26px", left: "-1px" }}
      >
        Fantasy
      </div>
      <div className="h-48 w-full flex gap-4 justify-center">
        {fantasy.map((item, index) => (
          <img src={item.image} alt="" key={index} className="h-48" />
        ))}
      </div>
      <div className="mb-2 mx-2 border border-teal-900 h-5  rounded-sm"></div>
    </div>
  );
};

export default FantasySection ;


