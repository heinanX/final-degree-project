import { IoIosCheckbox } from "react-icons/io";
import { MdOutlineCheckBoxOutlineBlank } from "react-icons/md";

interface SingleOrderShippedProps {
  shipped: boolean;
  disableForm: boolean;
  isShipped: boolean;
  setIsShipped: React.Dispatch<React.SetStateAction<boolean>>;
}
const SingleOrderShipped = ({
  shipped,
  disableForm,
  isShipped,
  setIsShipped,
}: SingleOrderShippedProps) => {

  const editCheckbox = () => {
    let checkboxContent;

    if (disableForm) {
      if (shipped) {
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
      if (shipped) {
        checkboxContent = (
          <input
            checked
            type="checkbox"
            onChange={() => setIsShipped(!isShipped)}
          />
        );
      } else {
        checkboxContent = <input type="checkbox" onChange={ ()=> setIsShipped(!shipped)} />;
      }
    }
    return <>{checkboxContent}</>;
  };

  return (
    <div className="flex flex-row items-center justify-between gap-2 uppercase">
      <label className="w-32">shipped</label>
      {editCheckbox()}
    </div>
  );
};

export default SingleOrderShipped;
