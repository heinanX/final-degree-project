import { IoIosCheckbox } from "react-icons/io";
import { MdOutlineCheckBoxOutlineBlank } from "react-icons/md";

interface ProductVhsAvailableProps {
    available: boolean;
    disableForm: boolean;
    newVhsAvailable: boolean;
    setNewVhsAvailable: React.Dispatch<React.SetStateAction<boolean>>;
  }

const ProductVhsAvailable = ({
    available,
    disableForm,
    newVhsAvailable,
    setNewVhsAvailable,
  }: ProductVhsAvailableProps) => {
  /* FUNCTION THAT SETS CONTENT OF CHECKBOX [AVAILABLE] BASED ON CURRENT STATE */
  const editCheckbox = () => {
    let checkboxContent; //initiates a variable

    if (disableForm) { // if form is not in edit mode display styled icons
      
      if (available) { //if available is true display ticked box
        checkboxContent = (
          <span className="text-base text-yellow-400">
            <IoIosCheckbox />
          </span>
        );
      } else { //else display empty box
        checkboxContent = (
          <span className="text-base text-yellow-400">
            <MdOutlineCheckBoxOutlineBlank />
          </span>
        );
      }

    } else { //else (when form is in edit mode)
        checkboxContent = <input type="checkbox" checked={newVhsAvailable} onClick={ ()=> setNewVhsAvailable(!newVhsAvailable)} />;
    }
    return <>{checkboxContent}</>; //returns component
  };

  return (
    <div className="flex flex-row items-center justify-between gap-2 uppercase">
      <label className="w-32">available</label>
      {editCheckbox()}
    </div>
  );
};

export default ProductVhsAvailable