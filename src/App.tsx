import "./App.css";

import Box from "@mui/material/Box";
import * as React from "react";
import Content from "./Components/LayoutArea/Content/Content";
import HeaderBar from "./Components/LayoutArea/HeaderBar/HeaderBar";
import Sidebar from "./Components/LayoutArea/Sidebar/Sidebar";
import { useSelector } from "react-redux";
import { AppState } from "./Redux/AppState";
import Login from "./Components/AuthArea/Login/Login";
import ConstraintType from "./Models/ConstraintType";
import { Client } from "@stomp/stompjs";
import { StompSessionProvider, useSubscription } from "react-stomp-hooks";

const SOCKET_URL = "http://localhost:8080/ws-message";

function App() {
  const [sideBarOpen, setSideBarOpen] = React.useState(false);
  const auth = useSelector((appState: AppState) => appState.auth);

  // React.useEffect(() => {
  //   const client = new Client({
  //     brokerURL: SOCKET_URL,
  //     reconnectDelay: 5000,
  //     heartbeatIncoming: 4000,
  //     heartbeatOutgoing: 4000,
  //     onConnect: onConnected,
  //     onDisconnect: onDisconnected,
  //   });

    // function onConnected() {
    //   console.log("Connected!!");
    //   client.subscribe("/topic/message", function (msg) {
    //     if (msg.body) {
    //       const jsonBody = JSON.parse(msg.body);
    //       if (jsonBody.name) {
    //         setMessage(jsonBody.name);
    //       }
    //     }
    //   });
    // }

  //   function onDisconnected() {
  //     console.log("Disconnected!!");
  //   }

  //   client.activate();
  // }, []);

  return (
    <Box sx={{ display: "flex" }} className="App">
      <HeaderBar open={sideBarOpen} setOpen={setSideBarOpen} />
      {auth ? (
        <>
          <Sidebar open={sideBarOpen} setOpen={setSideBarOpen} />
          {/* <StompSessionProvider url={SOCKET_URL}>
            <SubscribingComponent/>
          </StompSessionProvider> */}
          {/* <Box component="main" sx={{ flexGrow: 1, p: 3 }}> */}
          <Content />
          {/* </Box> */}
        </>
      ) : (
        <Login />
      )}
    </Box>
  );
}

// function SubscribingComponent() {
//   const [message, setMessage] = React.useState("Init");

//   useSubscription('/topic/message', function (msg) {
//     if (msg.body) {
//       const jsonBody = JSON.parse(msg.body);
//       if (jsonBody.name) {
//         setMessage(jsonBody.name);
//       }
//     }
//   })

//   return (
//     <div
//       style={{
//         width: "100%",
//         color: "black",
//         fontSize: "90px",
//         textAlign: "center",
//         paddingTop: "60px",
//       }}
//     >
//       {message}
//     </div>
//   );
// }

export default App;
