import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { useState } from "react";
import "./AdminSettingsArea.css";
import ConstraintTypeArea from "./ConstraintTypeArea/ConstraintTypeArea";
import ShiftTypeArea from "./ShiftTypeArea/ShiftTypeArea";
import UserTypeArea from "./UserTypeArea/UserTypeArea";
import WeekTypeArea from "./WeekTypeArea/WeekTypeArea";

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

function AdminSettingsArea(): JSX.Element {
  // const { state: id } = useLocation();
  // const allUsers = useSelector((appState: AppState) => appState.users);
  // const [user, setUser] = useState<User>();

  // useEffect(() => {
  //   setUser(allUsers.find((user) => user.id === id));
  // }, [allUsers, id]);
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    // <div className="AdminSettingsArea"
    // // onClick={(e) => props.onClick(user)}
    // >
    <Box sx={{ width: "100%" }} className="AdminSettingsArea">
      <Box sx={{ borderBottom: 1, borderColor: "divider", direction: "rtl" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="סוג משמרת" {...a11yProps(0)} />
          <Tab label="סוג כונן" {...a11yProps(1)} />
          <Tab label="סוג שבוע" {...a11yProps(2)} />
          <Tab label="סוג אילוץ" {...a11yProps(3)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <ShiftTypeArea />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <UserTypeArea />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <WeekTypeArea />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        <ConstraintTypeArea />
      </CustomTabPanel>
    </Box>
  );
}

export default AdminSettingsArea;
