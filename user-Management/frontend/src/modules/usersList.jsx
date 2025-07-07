import { useState } from "react";
import Button from "../shared/components/button";
import ConfirmDelete from "./confirmDelete";

const UsersList = ({ users, deleteUser, onEdit }) => {
  const thCssClasses = "border-2 text-center py-4 capitalize";
  const tdCssClasses = "border-2 text-center py-1";

  const tableHeading = [
    "Id",
    "Name",
    "Age",
    "Email",
    "Mobile Number",
    "Action",
  ];

  const SHOWUSER = 4;
  const [selDeleteUser, setSelDeleteUser] = useState({});
  const [currentIndex, setCurrentIndex] = useState({ start: 0, end: SHOWUSER });

  const userData = users.slice([currentIndex.start], [currentIndex.end]);

  const onDelete = (user) => {
    setSelDeleteUser(user);
  };

  const deleteUserData = () => {
    deleteUser(selDeleteUser);
    setSelDeleteUser({});
  };

  const onCancel = () => {
    setSelDeleteUser({});
  };

  const nextUser = () => {
    setCurrentIndex({
      start: currentIndex.end,
      end: currentIndex.end + SHOWUSER,
    });
  };
  const prevUser = () => {
    console.log('prev')
    setCurrentIndex({
      start: currentIndex.start - SHOWUSER,
      end: currentIndex.start,
    });
  };

  return (
    <>
      <table className="max-w-6xl w-11/12 my-10 mx-auto  ">
        <thead>
          <tr className="border-2">
            {tableHeading.map((index) => (
              <th className={thCssClasses} key={index}>
                {index}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {userData.map((user,index) => (
            <tr className="border-2" key={user.id}>
              <td className="text-center">{user._id}</td>
              <td className={tdCssClasses}>{user.name}</td>
              <td className={tdCssClasses}>{user.age}</td>
              <td className={tdCssClasses}>{user.email}</td>
              <td className={tdCssClasses}>{user.mobile_number}</td>
              <td className={tdCssClasses}>
                <Button onClick={() => onEdit(user,index)}>Edit</Button>
                <Button isWarning onClick={() => onDelete(user)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selDeleteUser._id && (
        <ConfirmDelete
          onCancel={onCancel}
          onConfirm={deleteUserData}
          userName={selDeleteUser.name}
        />
      )}
      <footer className=" flex justify-between max-w-6xl w-11/12 mx-auto py-6 ">
        <Button disabled={currentIndex.start === 0} onClick={prevUser}>
          Prev
        </Button>
        <Button disabled={users.length <= currentIndex.end} onClick={nextUser}>
          Next
        </Button>
      </footer>
    </>
  );
};
export default UsersList;
