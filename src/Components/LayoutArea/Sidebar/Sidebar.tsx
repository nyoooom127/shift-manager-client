import HomeIcon from "@mui/icons-material/Home";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import * as React from "react";
import { Menu, MenuItem, Sidebar as ReactSidebar } from "react-pro-sidebar";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppState } from "../../../Redux/AppState";
import { isAdmin } from "../../../Utils/UserUtils";
import "./Sidebar.css";

interface SidebarProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
// const drawerWidth = 240;

// const openedMixin = (theme: Theme): CSSObject => ({
//   width: drawerWidth,
//   transition: theme.transitions.create("width", {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.enteringScreen,
//   }),
//   overflowX: "hidden",
// });

// const closedMixin = (theme: Theme): CSSObject => ({
//   transition: theme.transitions.create("width", {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.leavingScreen,
//   }),
//   overflowX: "hidden",
//   width: `calc(${theme.spacing(7)} + 1px)`,
//   [theme.breakpoints.up("sm")]: {
//     width: `calc(${theme.spacing(8)} + 1px)`,
//   },
// });

// const Drawer = styled(MuiDrawer, {
//   shouldForwardProp: (prop) => prop !== "open",
// })(({ theme, open }) => ({
//   width: drawerWidth,
//   flexShrink: 0,
//   whiteSpace: "nowrap",
//   boxSizing: "border-box",
//   ...(open && {
//     ...openedMixin(theme),
//     "& .MuiDrawer-paper": openedMixin(theme),
//   }),
//   ...(!open && {
//     ...closedMixin(theme),
//     "& .MuiDrawer-paper": closedMixin(theme),
//   }),
// }));

function Sidebar({ open, setOpen }: SidebarProps): JSX.Element {
  const navigate = useNavigate();
  const auth = useSelector((appState: AppState) => appState.auth);
  // const { collapseSidebar, toggleSidebar, collapsed, toggled, broken, rtl } =
  //   useProSidebar();

  // const toggle = () => {
  //   toggleSidebar();
  //   if (toggled) {
  //     console.log(true);
  //     collapseSidebar();
  //   } else {
  //     console.log(false);
  //     collapseSidebar();
  //   }
  // };

  return (
    <ReactSidebar
      breakPoint="sm"
      transitionDuration={800}
      backgroundColor="#1976d2"
      rtl={true}
      style={{ height: "100vh" }}
      toggled={open}
      collapsed={!open}
      className="Sidebar"
    >
      {/* {!broken && ( */}
      <Menu>
        <MenuItem
          icon={<MenuOutlinedIcon />}
          onClick={() => {
            setOpen(!open);
          }}
          style={{ textAlign: "center" }}
        >
          <h2>Admin</h2>
        </MenuItem>

        <MenuItem icon={<HomeIcon />} onClick={() => navigate("/home")}>
          Home
        </MenuItem>
        <MenuItem
          icon={<PersonOutlinedIcon />}
          onClick={() => {
            navigate("/user", { state: auth.id });
          }}
        >
          Users
        </MenuItem>

        {auth && isAdmin(auth) && (
          <>
            <MenuItem
              icon={<PeopleOutlinedIcon />}
              onClick={() => navigate("/users")}
            >
              Users
            </MenuItem>

            <MenuItem
              icon={<AdminPanelSettingsIcon />}
              onClick={() => navigate("/adminSettings")}
            >
              Admin Settings
            </MenuItem>
          </>
        )}
        {/* <MenuItem icon={<ContactsOutlinedIcon />}>Contacts</MenuItem>
        <MenuItem icon={<ReceiptOutlinedIcon />}>Profile</MenuItem>
        <MenuItem icon={<HelpOutlineOutlinedIcon />}>FAQ</MenuItem>
        <MenuItem icon={<CalendarTodayOutlinedIcon />}>Calendar</MenuItem> */}
      </Menu>
      {/* )} */}
    </ReactSidebar>
  );
  // const theme = useTheme();

  // const handleDrawerClose = () => {
  //   setOpen(false);
  // };

  // return (
  //   <Box sx={{ display: "flex" }} className="SideBar">
  //     {/* <CssBaseline /> */}
  //     <Drawer variant="permanent" open={open}>
  //       <DrawerHeader>
  //         <IconButton onClick={handleDrawerClose}>
  //           {theme.direction === "rtl" ? (
  //             <ChevronRightIcon />
  //           ) : (
  //             <ChevronLeftIcon />
  //           )}
  //         </IconButton>
  //       </DrawerHeader>
  //       <Divider />
  //       <List>
  //       <ListItem disablePadding sx={{ display: "block" }}>
  //             <NavLink to="/home">
  //               <ListItemButton
  //                 sx={{
  //                   minHeight: 48,
  //                   justifyContent: open ? "initial" : "center",
  //                   px: 2.5,
  //                 }}
  //               >
  //                 <ListItemIcon
  //                   sx={{
  //                     minWidth: 0,
  //                     mr: open ? 3 : "auto",
  //                     justifyContent: "center",
  //                   }}
  //                 >
  //                   <HomeIcon />
  //                 </ListItemIcon>
  //                 <ListItemText primary='Home' sx={{ opacity: open ? 1 : 0 }} />
  //               </ListItemButton>
  //             </NavLink>
  //           </ListItem>
  //           <ListItem disablePadding sx={{ display: "block" }}>
  //             <NavLink to="/users">
  //               <ListItemButton
  //                 sx={{
  //                   minHeight: 48,
  //                   justifyContent: open ? "initial" : "center",
  //                   px: 2.5,
  //                 }}
  //               >
  //                 <ListItemIcon
  //                   sx={{
  //                     minWidth: 0,
  //                     mr: open ? 3 : "auto",
  //                     justifyContent: "center",
  //                   }}
  //                 >
  //                   <MailIcon />
  //                 </ListItemIcon>
  //                 <ListItemText primary='Users' sx={{ opacity: open ? 1 : 0 }} />
  //               </ListItemButton>
  //             </NavLink>
  //           </ListItem>
  //         {/* {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
  //           <ListItem key={text} disablePadding sx={{ display: "block" }}>
  //             <NavLink to="/home">
  //               <ListItemButton
  //                 sx={{
  //                   minHeight: 48,
  //                   justifyContent: open ? "initial" : "center",
  //                   px: 2.5,
  //                 }}
  //               >
  //                 <ListItemIcon
  //                   sx={{
  //                     minWidth: 0,
  //                     mr: open ? 3 : "auto",
  //                     justifyContent: "center",
  //                   }}
  //                 >
  //                   {index % 2 === 0 ? <HomeIcon /> : <MailIcon />}
  //                 </ListItemIcon>
  //                 <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
  //               </ListItemButton>
  //             </NavLink>
  //           </ListItem>
  //         ))} */}
  //       </List>
  //       {/* <Divider />
  //       <List>
  //         {["All mail", "Trash", "Spam"].map((text, index) => (
  //           <ListItem key={text} disablePadding sx={{ display: "block" }}>
  //             <ListItemButton
  //               sx={{
  //                 minHeight: 48,
  //                 justifyContent: open ? "initial" : "center",
  //                 px: 2.5,
  //               }}
  //             >
  //               <ListItemIcon
  //                 sx={{
  //                   minWidth: 0,
  //                   mr: open ? 3 : "auto",
  //                   justifyContent: "center",
  //                 }}
  //               >
  //                 {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
  //               </ListItemIcon>
  //               <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
  //             </ListItemButton>
  //           </ListItem>
  //         ))}
  //       </List> */}
  //     </Drawer>
  //   </Box>
  // );
}

export default Sidebar;
