import { IoIosCheckbox } from "react-icons/io";
import { MdOutlineCheckBoxOutlineBlank } from "react-icons/md";

interface SingleOrderShippedProps {
  shipped: boolean;
  disableForm: boolean;
  newShipped: boolean;
  setNewShipped: React.Dispatch<React.SetStateAction<boolean>>;
}

const SingleOrderShipped = ({
  shipped,
  disableForm,
  newShipped,
  setNewShipped,
}: SingleOrderShippedProps) => {

  /* FUNCTION THAT SETS CONTENT OF CHECKBOX [SHIPPED] BASED ON CURRENT STATE */
  const editCheckbox = () => {
    let checkboxContent; //initiates a variable

    if (disableForm) { // if form is not in edit mode display styled icons
      
      if (shipped) { //if shipped is true display ticked box
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
      if (shipped) { //if shipped is true it can't be undone
        checkboxContent = (
          <input
            checked
            type="checkbox"
          />
        );
      } else { //if not ticked, it may be managed
        checkboxContent = <input type="checkbox" onChange={ ()=> setNewShipped(!newShipped)} />;
      }
    }
    return <>{checkboxContent}</>; //returns component
  };

  return (
    <div className="flex flex-row items-center justify-between gap-2 uppercase">
      <label className="w-32">shipped</label>
      {editCheckbox()}
    </div>
  );
};

export default SingleOrderShipped;
