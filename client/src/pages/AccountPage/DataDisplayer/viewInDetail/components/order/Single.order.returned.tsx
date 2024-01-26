import { MdOutlineCheckBoxOutlineBlank } from "react-icons/md";
import { IoIosCheckbox } from "react-icons/io";

interface SingleOrderReturnedProps {
  returned: boolean;
  disableForm: boolean;
  newReturned: boolean;
  setNewReturned: React.Dispatch<React.SetStateAction<boolean>>;
}

/* FUNCTION THAT SETS CONTENT OF CHECKBOX [RETURNED] BASED ON CURRENT STATE */
const SingleOrderReturned = ({
  returned,
  disableForm,
  newReturned,
  setNewReturned,
}: SingleOrderReturnedProps) => {
  const editCheckbox = () => {
    let checkboxContent; //initiates a variable that content is stored inside 

    if (disableForm) { //if form is not in edit mode display styled icons

      if (returned) { //if returned is true display ticked box,
        checkboxContent = (
          <span className="text-base text-yellow-400">
            <IoIosCheckbox />
          </span>
        );
      } else {  //else display empty box
        checkboxContent = (
          <span className="text-base text-yellow-400">
            <MdOutlineCheckBoxOutlineBlank />
          </span>
        );
      }
    } else {  //else (when form is in edit mode)
      if (returned) { //if returned is true it can't be undone
        checkboxContent = (
          <input
            checked={returned}
            type="checkbox"
          />
        );
      } else { //if not ticked, it may be managed
        checkboxContent = (
          <input
            type="checkbox"
            onChange={() => setNewReturned(!newReturned)}
          />
        );
      }
    }
    return <>{checkboxContent}</>; //returns content
  };

  return (
    <div className="flex flex-row items-center justify-between gap-2 uppercase">
      <label className="w-32">returned</label>
      {editCheckbox()}
    </div>
  );
};

export default SingleOrderReturned;
