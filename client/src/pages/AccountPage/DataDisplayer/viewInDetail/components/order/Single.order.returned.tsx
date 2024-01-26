import { IoIosCheckbox } from "react-icons/io";
import { MdOutlineCheckBoxOutlineBlank } from "react-icons/md";

interface SingleOrderReturnedProps {
    returned: boolean;
    disableForm: boolean
    isReturned: boolean;
    setIsReturned: React.Dispatch<React.SetStateAction<boolean>>
  }
const SingleOrderReturned = ({returned, disableForm, isReturned, setIsReturned}: SingleOrderReturnedProps) => {
  
  const editCheckbox = () => {
    let checkboxContent;

    if (disableForm) {
      if (returned) {
        checkboxContent = (
          <span className="text-base">
            <IoIosCheckbox />
          </span>
        );
      } else {
        checkboxContent = (
          <span className="text-base">
            <MdOutlineCheckBoxOutlineBlank />
          </span>
        );
      }
    } else {
      if (returned) {
        checkboxContent = (
          <input
            checked
            type="checkbox"
            onChange={() => setIsReturned(!isReturned)}
          />
        );
      } else {
        checkboxContent = <input type="checkbox" onChange={ ()=> setIsReturned(!returned)} />;
      }
    }
    return <>{checkboxContent}</>;
  };

  return (
    <div className="flex flex-row items-center justify-between gap-2 uppercase">
    <label className="w-32">returned</label>
      {editCheckbox()}
  </div>
  )
}

export default SingleOrderReturned