import { useSocket as productSocket } from "../../../contexts/product.context";


const LeftPanel = () => {
    const { getMovie } = productSocket();
  return (
    <>
      <div className="w-1/2 bg-slate-500 flex justify-center py-4">
        <img
          data-info="Movie-image"
          src={getMovie?.image}
          alt={getMovie?.title}
          className="h-3/4"
        />
      </div>
    </>
  );
};

export default LeftPanel;
