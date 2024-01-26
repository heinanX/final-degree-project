import { useState } from "react";
import capitalizeLetters from "../../../../functions/capitalizeLetters";

interface FormSearchProps {
  setShowState: React.Dispatch<React.SetStateAction<boolean>>;
  displayComponent: string;
}

const FormSearch = ({ setShowState, displayComponent }: FormSearchProps) => {
  
    const [ searchById, setSearchById ] = useState<string>('');
    const handleSearch = () => {
      setShowState(false)
     console.log(searchById);
     //add logic to get an order by id
    }

  return (
    <form onSubmit={(e) => e.preventDefault()} className="flex flex-col w-full">
      <div className="w-full flex justify-evenly">
        <input
          type="text"
          onChange={(e) => setSearchById(e.target.value)}
          placeholder="search by id"
          className="text-black rounded px-2 py-1 flex-grow-0 flex-shrink-0 2/4 lg:w-2/3"
        />
        <button
          className="standard-btn flex-grow-0 flex-shrink-0"
          onClick={handleSearch}
        >
          Look up
        </button>
        <button
          className="standard-btn flex-grow-0 flex-shrink-0"
          onClick={() => setShowState(true)}
        >
          Show all
        </button>
      </div>


      
      <div className="w-full py-6 flex flex-row justify-center gap-8">

        {displayComponent === "orders" ? (
          <>
            <div className="flex flex-row gap-2">
              <label>{capitalizeLetters("active orders")}</label>
              <input type="checkbox" />
            </div>
            <div className="flex flex-row gap-2">
              <label>{capitalizeLetters("shipped")}</label>
              <input type="checkbox" />
            </div>
          </>
        ) : (
          <></>
        )}
        {displayComponent === "products" ? <p>hello</p> : <></>}
      </div>
    </form>
  );
};

export default FormSearch;
