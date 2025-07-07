import Button from "../shared/components/button";
import Modal from "../shared/components/modal";

const ConfirmDelete = ({ onCancel, onConfirm,userName }) => {
  return (
    <Modal heading="Are You Sure?" onCancel={onCancel}>
      <p className="text-white">
        Do you really want to delete this user: {userName} ?
      </p>
      <div className="flex justify-end gap-2 mt-4">
        <Button isBtnStyle={false} onClick={onCancel}>
          Cancel
        </Button>
        <Button isWarning={true} onClick={onConfirm}>
          Confirm
        </Button>
      </div>
    </Modal>
  );
};
export default ConfirmDelete;
