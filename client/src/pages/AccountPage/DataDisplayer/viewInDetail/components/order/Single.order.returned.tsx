import { IoIosCheckbox } from "react-icons/io";
import { MdOutlineCheckBoxOutlineBlank } from "react-icons/md";

interface SingleOrderReturnedProps {
    returned: boolean;
    disableForm: boolean
    isReturned: boolean;
    setIsReturned: React.Dispatch<React.SetStateAction<boolean>>
  }
const SingleOrderReturned = ({returned, disableForm}: SingleOrderReturnedProps) => {
  return (
    <div className="flex flex-row items-center justify-between gap-2 uppercase">
    <label className="w-32">returned</label>
    { disableForm ? returned ? (
      <span className="text-base">
        <IoIosCheckbox />
      </span>
    ) : (
      <span className="text-base">
        <MdOutlineCheckBoxOutlineBlank />
      </span>
    ) : (
      <input type="checkbox" />
    )}
  </div>
  )
}

export default SingleOrderReturned