import AddIcon from "@mui/icons-material/AddCircleOutline";
import EditIcon from "@mui/icons-material/Edit";
import { Card, CardContent, IconButton, Table } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import UserType from "../../../Models/UserType";
import { AppState } from "../../../Redux/AppState";
import UserTypeForm from "../UserTypeArea/UserTypeForm/UserTypeForm";
import "./UserTypeArea.css";

function UserTypeArea(): JSX.Element {
  const allUserTypes = useSelector(
    (appState: AppState) => appState.userTypes
  );
  const [userTypeFormOpen, setUserTypeFormOpen] =
    useState<boolean>(false);
  const [currentUserType, setCurrentUserType] =
    useState<UserType>();

  function handleUserTypeClick(userType: UserType) {
    setCurrentUserType(userType);
    setUserTypeFormOpen(true);
  }

  return (
    <div className="UserTypeArea">
      <Card raised={true} className="Card">
        <CardContent>
          <div className="title">
            אילוצים
            <IconButton
              size="large"
              className="addButton"
              onClick={() => handleUserTypeClick(new UserType())}
            >
              <AddIcon />
            </IconButton>
          </div>
          <Table>
            <thead>
              <tr>
                <th className="flex1">שם</th>
                {/* <th className="flex3">התחלה</th>
                <th className="flex3">סיום</th>
                <th className="flex4">הערה</th> */}
                <th className="flex1">ערוך</th>
              </tr>
            </thead>
            <tbody>
              {[...allUserTypes].sort().map((userType) => (
                <tr>
                  <td className="flex1">{userType.name}</td>
                  {/* <td className="flex3">
                      {moment(userType.startDate).format("lll")}
                    </td>
                    <td className="flex3">
                      {moment(userType.endDate).format("lll")}
                    </td>
                    <td className="flex4">{userType.comment}</td> */}
                  <td className="flex1">
                    <IconButton
                      onClick={() => handleUserTypeClick(userType)}
                    >
                      <EditIcon />
                    </IconButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </CardContent>
      </Card>
      <UserTypeForm
        open={userTypeFormOpen}
        setOpen={() => setUserTypeFormOpen(false)}
        initialValues={currentUserType}
      />
    </div>
  );
}

export default UserTypeArea;
