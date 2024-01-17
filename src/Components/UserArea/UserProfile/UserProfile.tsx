import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import User from "../../../Models/User";
import usersService from "../../../Services/UsersService";
import { isAdmin } from "../../../Utils/UserUtils";
import ConstraintArea from "../ConstraintArea/ConstraintArea";
import ShiftArea from "../ShiftArea/ShiftArea";
import UserSettings from "../UserSettings/UserSettings";
import "./UserProfile.css";

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
      {value === index && <>{children}</>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function UserProfile(): JSX.Element {
  const { state: id } = useLocation();
  const [auth, setAuth] = useState<User>();

  useEffect(() => {
    async function fetchAuth() {
      setAuth(await usersService.getById(id)); // useSelector((appState: AppState) => appState.auth);
    }

    fetchAuth();
  }, [id]);

  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  if (!(isAdmin(auth) || auth?.id === id)) {
    return null;
  }

  return (
    <Box sx={{ width: "100%" }} className="UserProfile">
      {auth && (
        <>
          {auth.fullName}
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
            <ShiftArea user={auth} />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <ConstraintArea user={auth} />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={2}>
            <UserSettings user={auth} />
          </CustomTabPanel>
        </>
      )}
    </Box>
  );
}

export default UserProfile;
