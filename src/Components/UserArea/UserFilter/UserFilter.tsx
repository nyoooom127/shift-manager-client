import FilterListIcon from '@mui/icons-material/FilterList';
import { ClickAwayListener } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Popover from '@mui/material/Popover';
import Tooltip from '@mui/material/Tooltip';
import { MouseEvent, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import User from '../../../Models/User';
import UserType from '../../../Models/UserType';
import { AppState } from '../../../Redux/AppState';
import RtlAutocomplete from '../../SharedArea/RtlAutocomplete/RtlAutocomplete';
import StyledForm from '../../SharedArea/StyledForm/StyledForm';
import './UserFilter.css';

export interface UserFilterFormFields {
  users: User[];
  types: UserType[];
}

interface UserFilterProps {
  onSubmit: (values: UserFilterFormFields) => void;
  showAllUsers?: boolean;
}

function UserFilter(props: UserFilterProps): JSX.Element {
  const [open, setOpen] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const allUserTypes = useSelector((appState: AppState) => appState.userTypes);
  const allUsers = useSelector((appState: AppState) => appState.users);
  const [users, setUsers] = useState<User[]>([]);
  const { handleSubmit, control, reset } = useForm<UserFilterFormFields>({
    mode: 'onChange',
    defaultValues: { users: [], types: [] },
  });

  useEffect(() => {
    if (!props.showAllUsers) {
      setUsers(allUsers.filter((user) => user.active));
    }
  }, [allUsers, props.showAllUsers]);

  function onClick(e: MouseEvent<HTMLButtonElement>) {
    if (!anchorEl) {
      setAnchorEl(e.currentTarget);
    }

    setOpen(!open);
  }

  async function send(fields: UserFilterFormFields) {
    try {
      props.onSubmit(fields);
      setOpen(false);
    } catch (err: any) {
      console.error(err);
    }
  }

  function handleClean() {
    reset();
    setOpen(false);
    send({ users: [], types: [] });
  }

  function handleCancel() {
    // reset();
    setOpen(false);
  }

  const handleClickAway = () => {
    setOpen(false);
  };

  return (
    <div className="UserFilter">
      <Tooltip title="Filter list">
        <IconButton onClick={onClick}>
          <FilterListIcon />
        </IconButton>
      </Tooltip>
      <Popover
        open={open}
        anchorEl={anchorEl}
        disablePortal
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <ClickAwayListener onClickAway={handleClickAway}>
          <StyledForm onSubmit={handleSubmit(send)} $userFilterForm>
            <Controller
              name="users"
              control={control}
              render={({ field: { ref, ...field }, fieldState }) => (
                <RtlAutocomplete
                  {...field}
                  fieldState={fieldState}
                  options={users}
                  multiple
                  labelKey={'fullName'}
                  label="משתמשים"
                />
              )}
            />
            <Controller
              name="types"
              control={control}
              render={({ field: { ref, ...field }, fieldState }) => (
                <RtlAutocomplete
                  {...field}
                  fieldState={fieldState}
                  options={allUserTypes}
                  multiple
                  labelKey={'name'}
                  label="סוגים"
                />
              )}
            />
            <div className="buttons">
              <button>אישור</button>
              <button type="button" onClick={handleCancel}>
                בטל
              </button>
              <button type="button" onClick={handleClean}>
                נקה
              </button>
            </div>
          </StyledForm>
        </ClickAwayListener>
      </Popover>
    </div>
  );
}

export default UserFilter;
