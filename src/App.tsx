import "./App.css";

import Box from "@mui/material/Box";
import * as React from "react";
import Content from "./Components/LayoutArea/Content/Content";
import HeaderBar from "./Components/LayoutArea/HeaderBar/HeaderBar";
import Sidebar from "./Components/LayoutArea/Sidebar/Sidebar";

function App() {
  const [sideBarOpen, setSideBarOpen] = React.useState(false);

  return (
    <Box sx={{ display: "flex" }} className="App">
      <HeaderBar open={sideBarOpen} setOpen={setSideBarOpen} />
      <Sidebar open={sideBarOpen} setOpen={setSideBarOpen} />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Content />
      </Box>
    </Box>
  );
}

export default App;
