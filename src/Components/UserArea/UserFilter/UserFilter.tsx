import FilterListIcon from "@mui/icons-material/FilterList";
import { ClickAwayListener } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Popover from "@mui/material/Popover";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import { MouseEvent, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import User from "../../../Models/User";
import UserType from "../../../Models/UserType";
import { AppState } from "../../../Redux/AppState";
import RtlAutocomplete from "../../SharedArea/RtlAutocomplete/RtlAutocomplete";
import "./UserFilter.css";

export interface UserFilterFormFields {
  users: User[];
  types: UserType[];
}

interface UserFilterProps {
  onSubmit: (values: UserFilterFormFields) => void;
}

function UserFilter(props: UserFilterProps): JSX.Element {
  const [open, setOpen] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const allUserTypes = useSelector((appState: AppState) => appState.userTypes);
  const allUsers = useSelector((appState: AppState) => appState.users);
  const { handleSubmit, control, reset } = useForm<UserFilterFormFields>({
    mode: "onChange",
    defaultValues: { users: [], types: [] },
  });

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
      <Toolbar
        sx={{
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
        }}
      >
        <Tooltip title="Filter list">
          <IconButton onClick={onClick}>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      </Toolbar>
      <Popover
        open={open}
        anchorEl={anchorEl}
        disablePortal
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <ClickAwayListener onClickAway={handleClickAway}>
          <form onSubmit={handleSubmit(send)}>
            <Controller
              name="users"
              control={control}
              render={({ field, fieldState }) => (
                <RtlAutocomplete
                  {...field}
                  fieldState={fieldState}
                  options={allUsers}
                  multiple
                  labelKey={"fullName"}
                  label="משתמשים"
                />
              )}
            />
            <Controller
              name="types"
              control={control}
              render={({ field, fieldState }) => (
                <RtlAutocomplete
                  {...field}
                  fieldState={fieldState}
                  options={allUserTypes}
                  multiple
                  labelKey={"name"}
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
          </form>
        </ClickAwayListener>
      </Popover>
    </div>
  );
}

export default UserFilter;
