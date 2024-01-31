import { FaSave } from "react-icons/fa";
import { FaPen } from "react-icons/fa";

// props interface for EditForm component
interface EditFormProps {
  disableForm: boolean;
  setDisableForm: React.Dispatch<React.SetStateAction<boolean>>;
  handleForm: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

/* A COMPONENT THAT RENDER THE ABILITY TO EDIT A [PRODUCT OR ORDER] FORM */

const EditForm = ({
  disableForm,
  setDisableForm,
  handleForm,
}: EditFormProps) => {
  return (
    <div className="flex flex-row w-full justify-end">
      {disableForm ? (
        // render the edit button when the form is disabled
        <button className="pb-4" onClick={() => setDisableForm(false)}>
          <FaPen />
        </button>
      ) : (
        // render the save button when the form is enabled
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
