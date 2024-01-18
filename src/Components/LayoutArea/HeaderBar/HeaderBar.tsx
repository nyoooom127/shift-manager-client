import LogoutIcon from "@mui/icons-material/Logout";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import { useSelector } from "react-redux";
import { AppState } from "../../../Redux/AppState";
import authService from "../../../Services/AuthService";
import logo from "../../../logo.svg";
import "./HeaderBar.css";

interface HeaderBarProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

// const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  // shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme }) => ({
  color: 'black'
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

  // function login() {
  //   authService.login({ username: "tamar", password: "123456" });
  // }

  function logout() {
    authService.logout();
  }

  // function handleDrawerOpen() {
  //   props.setOpen(true);
  // }

  return (
    <div className="HeaderBar">
      <AppBar position="fixed" open={props.open}>
        <Toolbar
          sx={{
            justifyContent: auth ? "space-between" : "center",
            marginLeft: "5rem",
            width: "100%",
            boxSizing: "border-box",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: auth ? "space-between" : "center",
              width: "calc(100% - 4rem)",
            }}
          >
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
            <div
              style={{
                display: "flex",
                width: "fit-content",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              <img src={logo} className="App-logo" alt="logo" />
              <Typography
                variant="h6"
                noWrap
                component="div"
                textAlign="center"
                color='black'
              >
                Shift Manager
              </Typography>
            </div>
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
