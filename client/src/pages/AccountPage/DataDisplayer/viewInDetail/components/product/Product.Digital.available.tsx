import { IoIosCheckbox } from "react-icons/io";
import { MdOutlineCheckBoxOutlineBlank } from "react-icons/md";

interface ProductDigitalAvailableProps {
    available: boolean;
    disableForm: boolean;
    newDigitalAvailable: boolean;
    setNewDigitalAvailable: React.Dispatch<React.SetStateAction<boolean>>;
  }

const ProductDigitalAvailable = ({
    available,
    disableForm,
    newDigitalAvailable,
    setNewDigitalAvailable,
  }: ProductDigitalAvailableProps) => {
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

    } else {
        checkboxContent = <input type="checkbox" checked={newDigitalAvailable} onChange={ ()=> setNewDigitalAvailable(!newDigitalAvailable)} />;
      
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

export default ProductDigitalAvailable