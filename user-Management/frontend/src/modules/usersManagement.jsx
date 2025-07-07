import { useEffect, useState } from "react";
import Header from "../shared/components/header";
import UserForm from "./userForm";
import UsersList from "./usersList";
import {
  getUsers,
  addUser,
  updateUser,
  deleteUser as deleteUserAPI,
} from "../../http.js";

const UsersManagement = () => {
  const [isOpenFormModal, setIsOpenFormModal] = useState(false);
  const [userData, setUserData] = useState([]);
  const [initialUserInput, setInitialUserInput] = useState({});
  const [editUserIndex, setEditUserIndex] = useState();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersData = await getUsers();
        setUserData(usersData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUsers();
  }, []);

  const toggleFormModal = () => {
    setIsOpenFormModal(!isOpenFormModal);
    setInitialUserInput({
      name: "",
      age: "",
      email: "",
      mobile_number: "",
    });
  };
  const userInputSave = async (aUser) => {
    try {
      if (initialUserInput._id) {
        await updateUser(aUser._id, aUser);
        const updatedUserList = userData.map((user) =>
          user._id === aUser._id ? aUser : user
        );
        setUserData(updatedUserList);
      } else {
        const newUser = await addUser(aUser);
        setUserData([...userData, newUser]);
      }
      toggleFormModal();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteUserData = async (aUser) => {
    try {
      await deleteUserAPI(aUser._id);
      const updatedUserList = userData.filter((user) => user._id !== aUser._id);
      setUserData(updatedUserList);
    } catch (error) {
      console.log(error);
    }
  };

  const onEdit = (aUser, index) => {
    setIsOpenFormModal(!isOpenFormModal);
    setInitialUserInput(aUser);
    setEditUserIndex(index);
  };

  const formValidation = (inputValue) => {
    let error = {};
    const filteredUsers = userData.filter(
      (aUser) => aUser._id !== initialUserInput._id
    );

    if (filteredUsers.some((aUser) => aUser.email === inputValue.email)) {
      error.email = "Email must be unique.";
    }

    if (
      filteredUsers.some(
        (aUser) => aUser.mobile_number === inputValue.mobile_number
      )
    ) {
      error.mobile_number = "Mobile Number must be unique.";
    }
    return error;
  };

  const nextPrev = (aId, action) => {
    let findUser = "";
    let findIndex = editUserIndex;
    if (action === "next") {
      findIndex++;
    } else {
      findIndex--;
    }
    setEditUserIndex(findIndex);
    findUser = userData.find((_, index) => index === findIndex);
    setInitialUserInput(findUser);
  };

  return (
    <>
      <Header
        heading="User Management"
        onClick={toggleFormModal}
        buttonName="+ Add User"
      />
      <UsersList users={userData} deleteUser={deleteUserData} onEdit={onEdit} />

      {isOpenFormModal && (
        <UserForm
          openForm={toggleFormModal}
          userInputSave={userInputSave}
          initialUserInput={initialUserInput}
          formValidation={formValidation}
          nextPrev={nextPrev}
          userDataLength={userData.length}
          index={editUserIndex}
        />
      )}
    </>
  );
};
export default UsersManagement;
