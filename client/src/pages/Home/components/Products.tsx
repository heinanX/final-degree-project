import { useEffect } from "react";
import { useSocket as useSocketProducts } from "../../../contexts/product.context";

const Products = () => {
  const { getProducts, products } = useSocketProducts();

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="w-full  bg-slate-400 py-20 flex gap-2 flex-wrap">
{products.map((item, index) => (
  <div key={index} className="">
    <p>{item.title}</p>
    <img src={item.image} className="w-40" />
  </div>
))}
{/*       <div className="relative bg-teal-700 my-10 mx-16 h-60 flex flex-col justify-end rounded-sm">
        <div className="absolute bg-teal-800 px-10" style={{top: '-23px'}}>News</div>
        <div className="my-2 mx-2 bg-teal-900 h-5  rounded-sm">
        </div>
      </div>
      <div className="relative my-10 mx-16 bg-teal-700 h-60 flex flex-col justify-end rounded-sm">
      <div className="absolute bg-teal-800 px-10" style={{top: '-23px'}}>Hot Rentals</div>
        <div className="my-2 mx-2 bg-teal-900 h-5  rounded-sm">
        </div>
      </div>
      <div className="relative my-10 mx-16 bg-teal-700 h-60 flex flex-col justify-end rounded-sm">
      <div className="absolute bg-teal-800 px-10" style={{top: '-23px'}}>Throw Backs</div>
        <div className="my-2 mx-2 bg-teal-900 h-5  rounded-sm">
        </div>
      </div>
      <div className="relative my-10 mx-16 bg-teal-700 h-60 flex flex-col justify-end rounded-sm">
      <div className="absolute bg-teal-800 px-10" style={{top: '-23px'}}>Fantasy</div>
        <div className="my-2 mx-2 bg-teal-900 h-5  rounded-sm">
        </div>
      </div> */}
    </div>
  );
};

export default Products;
