import AddIcon from "@mui/icons-material/AddCircleOutline";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import { Card, CardContent, Dialog, IconButton, Table } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import User from "../../../Models/User";
import UserPermissionsEnum from "../../../Models/UserPermissionsEnum";
import { AppState } from "../../../Redux/AppState";
import UserSettings from "../UserSettings/UserSettings";
import "./AllUsers.css";

function AllUsers(): JSX.Element {
  const navigate = useNavigate();
  const allUsers = useSelector((appState: AppState) => appState.users);
  const [userFormOpen, setUserFormOpen] = useState<boolean>(false);

  function handleUserClick(user: User) {
    navigate("/user", { state: user.id });
  }

  function handleNewUserClick() {
    setUserFormOpen(true);
  }

  return (
    <div className="AllUsers">
      <Card raised={true} className="Card">
        <CardContent>
          <div className="title">
            משתשמים
            <IconButton
              size="large"
              className="addButton"
              onClick={
                () => handleNewUserClick()
                // new User(
                //   "",
                //   [],
                //   new Map<string, number>(),
                //   { userPermissions: UserPermissionsEnum.USER },
                //   [],
                //   [],
                //   true
                // )
              }
            >
              <AddIcon />
            </IconButton>
          </div>
          <Table>
            <thead>
              <tr>
                <th className="flex2">שם</th>
                <th className="flex4">סוגים</th>
                <th className="flex1">הרחב</th>
              </tr>
            </thead>
            <tbody>
              {allUsers.map((user) => (
                <tr key={user.id}>
                  <td className="flex1">{user.fullName}</td>
                  <td className="flex4">
                    <div className="types">
                      {user.types.map((type) => (
                        <div key={type.id} className="type">
                          {type.name}
                        </div>
                      ))}
                    </div>
                  </td>
                  <td className="flex1">
                    <IconButton onClick={() => handleUserClick(user)}>
                      <OpenInFullIcon />
                    </IconButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </CardContent>
      </Card>
      <Dialog open={userFormOpen}>
        <UserSettings
          setOpen={setUserFormOpen}
          isNew
          user={
            new User(
              "",
              [],
              new Map<string, number>(),
              {
                userPermissions: UserPermissionsEnum.USER,
                username: "",
                email: "",
                phone: "",
                password: "",
              },
              [],
              [],
              true
            )
          }
        />
      </Dialog>
    </div>
  );
}

export default AllUsers;
