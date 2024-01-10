import AddIcon from "@mui/icons-material/AddCircleOutline";
import EditIcon from "@mui/icons-material/Edit";
import { Card, CardContent, IconButton, Table } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import ShiftType from "../../../Models/ShiftType";
import { AppState } from "../../../Redux/AppState";
import ShiftTypeForm from "../ShiftTypeArea/ShiftTypeForm/ShiftTypeForm";
import "./ShiftTypeArea.css";

function ShiftTypeArea(): JSX.Element {
  const allShiftTypes = useSelector(
    (appState: AppState) => appState.shiftTypes
  );
  const [shiftTypeFormOpen, setShiftTypeFormOpen] = useState<boolean>(false);
  const [isNew, setIsNew] = useState<boolean>(false);
  const [currentShiftType, setCurrentShiftType] = useState<ShiftType>();

  function handleShiftTypeClick(shiftType: ShiftType, isNEwShiftType: boolean) {
    setCurrentShiftType(shiftType);
    setShiftTypeFormOpen(true);
    setIsNew(isNEwShiftType);
  }

  return (
    <div className="ShiftTypeArea">
      <Card raised={true} className="Card">
        <CardContent>
          <div className="title">
            אילוצים
            <IconButton
              size="large"
              className="addButton"
              onClick={() => handleShiftTypeClick(new ShiftType(), true)}
            >
              <AddIcon />
            </IconButton>
          </div>
          <Table>
            <thead>
              <tr>
                <th className="flex1">שם</th>
                {/* <th className="flex3">התחלה</th>
                <th className="flex3">סיום</th>
                <th className="flex4">הערה</th> */}
                <th className="flex1">ערוך</th>
              </tr>
            </thead>
            <tbody>
              {[...allShiftTypes].sort().map((shiftType) => (
                <tr>
                  <td className="flex1">{shiftType.name}</td>
                  {/* <td className="flex3">
                      {moment(shiftType.startDate).format("lll")}
                    </td>
                    <td className="flex3">
                      {moment(shiftType.endDate).format("lll")}
                    </td>
                    <td className="flex4">{shiftType.comment}</td> */}
                  <td className="flex1">
                    <IconButton
                      onClick={() => handleShiftTypeClick(shiftType, false)}
                    >
                      <EditIcon />
                    </IconButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </CardContent>
      </Card>
      {shiftTypeFormOpen && (
        <ShiftTypeForm
          open={shiftTypeFormOpen}
          setOpen={() => setShiftTypeFormOpen(false)}
          initialValues={currentShiftType}
          isNew={isNew}
        />
      )}
    </div>
  );
}

export default ShiftTypeArea;
