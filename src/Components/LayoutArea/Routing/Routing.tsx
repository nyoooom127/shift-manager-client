import { Navigate, Route, Routes } from "react-router-dom";
import Home from "../../HomeArea/Home/Home";
import AllUsers from "../../UserArea/AllUsers/AllUsers";
import "./Routing.css";
import UserProfile from "../../UserArea/UserProfile/UserProfile";
import AdminSettingsArea from "../../AdminSettingsArea/AdminSettingsArea";

function Routing(): JSX.Element {
  return (
    <div className="Routing">
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/users" element={<AllUsers />} />
        <Route path="/user" element={<UserProfile />} />
        <Route path="/adminSettings" element={<AdminSettingsArea />} />
        <Route path="/" element={<Navigate to="/home" />} />
      </Routes>
    </div>
  );
}

export default Routing;
