import Input from "../shared/components/input";
import Button from "../shared/components/button";
import { useEffect, useState } from "react";
import Modal from "../shared/components/modal";

const UserForm = ({
  openForm,
  userInputSave,
  initialUserInput,
  formValidation,
  nextPrev,
  userDataLength,
  index,
}) => {
  const [inputValue, setInputValue] = useState(initialUserInput);
  const [errorMessage, setErrorMessage] = useState({});

  useEffect(() => {
    setInputValue(initialUserInput);
  }, [initialUserInput]);

  const validateUser = () => {
    let clientSideError = {};

    if (!/^[A-Za-z\s]+$/.test(inputValue.name) || inputValue.name.length < 3) {
      clientSideError.name =
        "Enter a valid name (only letters, at least 3 characters).";
    }

    if (inputValue.age < 18) {
      clientSideError.age = "Age must be at least 18.";
    }

    if (!inputValue.email) {
      clientSideError.email = "Email cannot be empty.";
    }

    if (!/^\d{10}$/.test(inputValue.mobile_number)) {
      clientSideError.mobile_number =
        "Mobile Number must be exactly 10 digits.";
    }

    const serverSideError = formValidation(inputValue);
    const allFormError = { ...clientSideError, ...serverSideError };

    return allFormError;
  };

  const onSave = (event) => {
    event.preventDefault();

    const error = validateUser();
    if (Object.keys(error).length !== 0) {
      setErrorMessage(error);
      return;
    }
    userInputSave(inputValue);
  };

  const onInput = (event) => {
    setInputValue({ ...inputValue, [event.target.name]: event.target.value });
  };

  const onNextPrev = (action) => {
    setErrorMessage({});
    nextPrev(inputValue.id, action);
  };

  return (
    <Modal
      onCancel={openForm}
      heading={inputValue.id ? "Edit User" : "New User"}
    >
      <form onSubmit={onSave}>
        <div>
          <Input
            onChange={(event) => onInput(event)}
            value={inputValue.name}
            label="Name"
            type="text"
            errorMsg={errorMessage.name}
            name="name"
          />
          <Input
            onChange={(event) => onInput(event)}
            value={inputValue.age}
            label="Age"
            type="number"
            errorMsg={errorMessage.age}
            name="age"
          />
          <Input
            onChange={(event) => onInput(event)}
            value={inputValue.email}
            label="Email"
            type="email"
            errorMsg={errorMessage.email}
            name="email"
          />
          <Input
            onChange={(event) => onInput(event)}
            value={inputValue.mobile_number}
            label="Mobile Number"
            type="number"
            errorMsg={errorMessage.mobile_number}
            name="mobile_number"
          />
        </div>
        <div className="flex justify-end gap-2 ">
          {inputValue.id && (
            <div className="flex justify-between">
              <Button
                onClick={() => onNextPrev("prev")}
                disabled={index === 0}
                type="button"
              >
                Prev
              </Button>
              <Button
                onClick={() => onNextPrev("next")}
                disabled={index === userDataLength-1}
                type="button"
              >
                Next
              </Button>
            </div>
          )}
          <Button isBtnStyle={false} type="button" onClick={openForm}>
            Cancel
          </Button>
          <Button type="submit">Save</Button>
        </div>
      </form>
    </Modal>
  );
};

export default UserForm;
