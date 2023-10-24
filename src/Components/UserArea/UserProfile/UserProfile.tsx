import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import User from "../../../Models/User";
import { AppState } from "../../../Redux/AppState";
import ConstraintArea from "../ConstraintArea/ConstraintArea";
import ShiftArea from "../ShiftArea/ShiftArea";
import UserSettings from "../UserSettings/UserSettings";
import "./UserProfile.css";

interface UserProfileProps {
  //   user: User;
  //   onClick: (user: User) => void;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      className="TabPanel"
      {...other}
    >
      {value === index && (
        //   <Box sx={{ p: 3 }}>
        //     <Typography>{children}</Typography>
        //   </Box>
        <>{children}</>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function UserProfile(props: UserProfileProps): JSX.Element {
  const { state: id } = useLocation();
  const allUsers = useSelector((appState: AppState) => appState.users);
  const [user, setUser] = useState<User>();

  useEffect(() => {
    setUser(allUsers.find((user) => user.id === id));
  }, [allUsers, id]);

  const [constraintFormOpen, setConstraintFormOpen] = useState<boolean>(false);

  //   useEffect(() => {
  //     console.log(constraintFormOpen);
  //   }, [constraintFormOpen]);

  //   function closeTemp(status: boolean) {
  //     setConstraintFormOpen(status);
  //   }
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    // <div className="UserProfile"
    // // onClick={(e) => props.onClick(user)}
    // >
    <Box sx={{ width: "100%" }} className="UserProfile">
      {user && (
        <>
          {user.fullName}
          <Box
            sx={{ borderBottom: 1, borderColor: "divider", direction: "rtl" }}
          >
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab label="משמרות" {...a11yProps(0)} />
              <Tab label="אילוצים" {...a11yProps(1)} />
              <Tab label="הגדרות" {...a11yProps(2)} />
            </Tabs>
          </Box>
          <CustomTabPanel value={value} index={0}>
            <ShiftArea user={user} />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <ConstraintArea user={user} />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={2}>
            <UserSettings user={user} />
          </CustomTabPanel>
        </>
      )}
    </Box>
    //    <ConstraintForm
    //     open={constraintFormOpen}
    //     setOpen={() => setConstraintFormOpen(false)}
    //     initialValues={
    //       new Constraint(undefined, moment(), moment(), user.id, "")
    //     }

    // </div>
  );
}

export default UserProfile;
