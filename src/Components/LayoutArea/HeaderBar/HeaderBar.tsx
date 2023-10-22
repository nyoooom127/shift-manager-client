import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import { useSelector } from "react-redux";
import { AppState } from "../../../Redux/AppState";
import authService from "../../../Services/AuthService";
import "./HeaderBar.css";

interface HeaderBarProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  // shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme }) => ({
  // zIndex: theme.zIndex.drawer + 1,
  // transition: theme.transitions.create(["width", "margin"], {
  //   easing: theme.transitions.easing.sharp,
  //   duration: theme.transitions.duration.leavingScreen,
  // }),
  // ...(open && {
  //   marginLeft: drawerWidth,
  //   width: `calc(100% - ${drawerWidth}px)`,
  //   transition: theme.transitions.create(["width", "margin"], {
  //     easing: theme.transitions.easing.sharp,
  //     duration: theme.transitions.duration.enteringScreen,
  //   }),
  // }),
}));

function HeaderBar(props: HeaderBarProps): JSX.Element {
  const auth = useSelector((appState: AppState) => appState.auth);

  function login() {
    authService.login({ username: "tamar", password: "123456" });
  }

  function logout() {
    authService.logout();
  }

  function handleDrawerOpen() {
    props.setOpen(true);
  }

  return (
    <div className="HeaderBar">
      <AppBar position="fixed" open={props.open}>
        <Toolbar sx={{ justifyContent: auth ? "space-between" : "center" }}>
          <div style={{ display: "flex", justifyContent: auth ? "space-between" : "center" }}>
            {/* {auth && (
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                sx={{
                  marginRight: 5,
                  ...(props.open && { display: "none" }),
                }}
              >
                <MenuIcon />
              </IconButton>
            )} */}
            <Typography variant="h6" noWrap component="div">
              Shift Manager
            </Typography>
          {/* </div>
          <div style={{ display: "flex" }}> */}
            {auth && (
              <IconButton
                color="inherit"
                edge="end"
                sx={
                  {
                    // alignSelf: '',
                    // right: 5,
                    // width: "fit-content",
                    // position: "absolute", right: '20px', top: '20px'
                  }
                }
                onClick={logout}
              >
                <LogoutIcon />
              </IconButton>
            )}
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default HeaderBar;
