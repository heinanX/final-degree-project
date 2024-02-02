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
    let checkboxContent;

    if (disableForm) {

      if (returned) {
        checkboxContent = (
          <span className="text-base text-yellow-400">
            <IoIosCheckbox />
          </span>
        );
      } else {
        checkboxContent = (
          <span className="text-base text-yellow-400">
            <MdOutlineCheckBoxOutlineBlank />
          </span>
        );
      }
    } else {
      if (returned) {
        checkboxContent = (
          <input
            checked={returned}
            type="checkbox"
          />
        );
      } else {
        checkboxContent = (
          <input
            type="checkbox"
            onChange={() => setNewReturned(!newReturned)}
          />
        );
      }
    }
    return <>{checkboxContent}</>;
  };

  return (
    <div className="flex flex-row items-center justify-between gap-2 uppercase">
      <label className="w-32">returned</label>
      {editCheckbox()}
    </div>
  );
};

export default SingleOrderReturned;
