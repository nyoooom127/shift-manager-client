import AddIcon from '@mui/icons-material/AddCircleOutline';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import {
  Box,
  Dialog,
  IconButton,
  Paper,
  Table,
  Toolbar
} from '@mui/material';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import User from '../../../Models/User';
import UserPermissionsEnum from '../../../Models/UserPermissionsEnum';
import UserType from '../../../Models/UserType';
import { AppState } from '../../../Redux/AppState';
import UserFilter, { UserFilterFormFields } from '../UserFilter/UserFilter';
import UserSettings from '../UserSettings/UserSettings';
import './AllUsers.css';

function AllUsers(): JSX.Element {
  const navigate = useNavigate();
  const allUsers = useSelector((appState: AppState) => appState.users);
  const [userFormOpen, setUserFormOpen] = useState<boolean>(false);
  const [userTypes, setUserTypes] = useState<UserType[]>([]);
  const [users, setUsers] = useState<User[]>([]);

  function handleUserClick(user: User) {
    navigate('/user', { state: user.id });
  }

  function handleNewUserClick() {
    setUserFormOpen(true);
  }

  function onSubmitFilter(values: UserFilterFormFields) {
    setUserTypes(values.types);
    setUsers(values.users);
  }

  return (
    <div className="AllUsers">
      <Box className="Card">
        <div className="title">
          משתשמים
          <IconButton
            size="large"
            className="addButton"
            onClick={() => handleNewUserClick()}
          >
            <AddIcon />
          </IconButton>
        </div>
        <Paper>
          <Toolbar
            sx={{
              pl: { sm: 2 },
              pr: { xs: 1, sm: 1 },
            }}
          >
            <UserFilter onSubmit={onSubmitFilter} showAllUsers />
          </Toolbar>
          <Table>
            <thead>
              <tr>
                <th className="flex2">שם</th>
                <th className="flex4">סוגים</th>
                <th className="flex1">הרחב</th>
              </tr>
            </thead>
            <tbody>
              {(users.length > 0 ? users : allUsers)
                .filter(
                  (user) =>
                    userTypes.length === 0 ||
                    user.types.some((type) =>
                      userTypes.some((userType) => userType.id === type.id)
                    )
                )
                .map((user) => (
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
        </Paper>
      </Box>
      <Dialog open={userFormOpen}>
        <UserSettings
          setOpen={setUserFormOpen}
          isNew
          user={
            new User(
              '',
              [],
              {},
              {},
              {},
              {
                userPermissions: UserPermissionsEnum.USER,
                username: '',
                email: '',
                phone: '',
                password: '',
              },
              [],
              [],
              true,
              false,
              false
            )
          }
        />
      </Dialog>
    </div>
  );
}

export default AllUsers;
