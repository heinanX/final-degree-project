import { IoIosCheckbox } from "react-icons/io";
import { MdOutlineCheckBoxOutlineBlank } from "react-icons/md";
import { iProductDigital } from "../../../../../../interfaces/product.interface";

interface ProductDigitalAvailableProps {
  available: boolean;
  disableForm: boolean;
  newDigital: Partial<iProductDigital>;
  setNewDigital: React.Dispatch<React.SetStateAction<Partial<iProductDigital>>>;
}

/* A COMPONENT THAT RENDERS DIFFERENT AVAILIBILITY CHECKBOXES FOR DIGITAL
   DEPENDENT ON EDIT MODE OR NOT. IT ALSO UPDATES ITS DATA. */

const ProductDigitalAvailable = ({
  available,
  disableForm,
  newDigital,
  setNewDigital,
}: ProductDigitalAvailableProps) => {
  const setAvailability = () => {
    setNewDigital((prevDigital) => ({
      ...prevDigital,
      available: !prevDigital.available,
    }));
  };

  /* function that sets content of checkbox [available] based on current state */
  const editCheckbox = () => {
    let checkboxContent; //initiates a variable

    if (disableForm) {
      // if form is not in edit mode display styled icons

      if (available) {
        //if available is true display ticked box
        checkboxContent = (
          <span className="text-base text-yellow-400">
            <IoIosCheckbox />
          </span>
        );
      } else {
        //else display empty box
        checkboxContent = (
          <span className="text-base text-yellow-400">
            <MdOutlineCheckBoxOutlineBlank />
          </span>
        );
      }
    } else {
      checkboxContent = (
        <input
          type="checkbox"
          checked={newDigital.available}
          onChange={setAvailability}
        />
      );
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

export default ProductDigitalAvailable;
