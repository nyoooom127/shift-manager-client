import { Navigate, Route, Routes } from "react-router-dom";
import AdminSettingsArea from "../../AdminSettingsArea/AdminSettingsArea";
import Home from "../../HomeArea/Home/Home";
import SummaryArea from "../../SummaryArea/SummaryArea";
import AllUsers from "../../UserArea/AllUsers/AllUsers";
import UserProfile from "../../UserArea/UserProfile/UserProfile";
import "./Routing.css";

function Routing(): JSX.Element {
  return (
    <div className="Routing">
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/users" element={<AllUsers />} />
        <Route path="/user" element={<UserProfile />} />
        <Route path="/summary" element={<SummaryArea />} />
        <Route path="/adminSettings" element={<AdminSettingsArea />} />
        <Route path="/" element={<Navigate to="/home" />} />
      </Routes>
    </div>
  );
}

export default Routing;
