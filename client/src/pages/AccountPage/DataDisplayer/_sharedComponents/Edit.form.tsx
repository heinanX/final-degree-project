import { FaSave } from "react-icons/fa";
import { FaPen } from "react-icons/fa";

interface EditFormProps {
  disableForm: boolean;
  setDisableForm: React.Dispatch<React.SetStateAction<boolean>>;
  handleForm: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}
const EditForm = ({
  disableForm,
  setDisableForm,
  handleForm,
}: EditFormProps) => {
  return (
    <div className="flex flex-row w-full justify-end">
      {disableForm ? (
        <button className="pb-4" onClick={() => setDisableForm(false)}>
          <FaPen />
        </button>
      ) : (
        <button
          className="pb-4 w-30 flex flex-row items-center gap-2 justify-center"
          onClick={(e) => handleForm(e)}
        >
          <p>Save</p>
          <FaSave />
        </button>
      )}
    </div>
  );
};

export default EditForm;
