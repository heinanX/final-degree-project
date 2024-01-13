import { useSocket as useSocketProducts } from "../../../contexts/product.context";

const FantasySection = () => {

  const { products } = useSocketProducts();

  const fantasy = products.slice(5,10)
  // {products.map((item, index) => (
  //   <div key={index} className="">
  //     {/* <p>{item.title}</p> */}
  //     <img src={item.image} className="w-40" />
  //   </div>
  // ))}
  return (
    <div className="relative my-10 mx-16 border border-teal-700 h-60 flex flex-col justify-end rounded-sm">
      <div className="absolute border border-teal-700 px-10 text-teal-700" style={{ top: "-26px", left: '-1px' }}>
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
