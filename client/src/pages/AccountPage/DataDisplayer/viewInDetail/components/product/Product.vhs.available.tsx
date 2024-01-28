import { IoIosCheckbox } from "react-icons/io";
import { MdOutlineCheckBoxOutlineBlank } from "react-icons/md";
import { iProductVhs } from "../../../../../../interfaces/product.interface";

interface ProductVhsAvailableProps {
  available: boolean;
  disableForm: boolean;
  newVhs: Partial<iProductVhs>;
  setNewVhs: React.Dispatch<React.SetStateAction<Partial<iProductVhs>>>;
}

/* A COMPONENT THAT RENDERS DIFFERENT AVAILIBILITY CHECKBOXES FOR VHS
   DEPENDENT ON EDIT MODE OR NOT. IT ALSO UPDATES ITS DATA. */

const ProductVhsAvailable = ({
  available,
  disableForm,
  newVhs,
  setNewVhs,
}: ProductVhsAvailableProps) => {
  const setAvailability = () => {
    setNewVhs((prevVhs) => ({
      ...prevVhs,
      available: !prevVhs.available,
    }));
  };

  /* function that sets content of checkbox [available] based on current state */
  const setCheckbox = () => {
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
      //else (when form is in edit mode)
      checkboxContent = (
        <input
          type="checkbox"
          checked={newVhs.available}
          onChange={setAvailability}
        />
      );
    }
    return <>{checkboxContent}</>; //returns component
  };

  return (
    <div className="flex flex-row items-center justify-between gap-2 uppercase">
      <label className="w-32">available</label>
      {setCheckbox()}
    </div>
  );
};

export default ProductVhsAvailable;
