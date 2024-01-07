import AddIcon from "@mui/icons-material/AddCircleOutline";
import EditIcon from "@mui/icons-material/Edit";
import { Card, CardContent, IconButton, Table } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import WeekType from "../../../Models/WeekType";
import { AppState } from "../../../Redux/AppState";
import WeekTypeForm from "../WeekTypeArea/WeekTypeForm/WeekTypeForm";
import "./WeekTypeArea.css";

function WeekTypeArea(): JSX.Element {
  const allWeekTypes = useSelector(
    (appState: AppState) => appState.weekTypes
  );
  const [weekTypeFormOpen, setWeekTypeFormOpen] =
    useState<boolean>(false);
  const [currentWeekType, setCurrentWeekType] =
    useState<WeekType>();

  function handleWeekTypeClick(weekType: WeekType) {
    setCurrentWeekType(weekType);
    setWeekTypeFormOpen(true);
  }

  return (
    <div className="WeekTypeArea">
      <Card raised={true} className="Card">
        <CardContent>
          <div className="title">
            אילוצים
            <IconButton
              size="large"
              className="addButton"
              onClick={() => handleWeekTypeClick(new WeekType())}
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
              {allWeekTypes.sort().map((weekType) => (
                <tr>
                  <td className="flex1">{weekType.name}</td>
                  {/* <td className="flex3">
                      {moment(weekType.startDate).format("lll")}
                    </td>
                    <td className="flex3">
                      {moment(weekType.endDate).format("lll")}
                    </td>
                    <td className="flex4">{weekType.comment}</td> */}
                  <td className="flex1">
                    <IconButton
                      onClick={() => handleWeekTypeClick(weekType)}
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
      <WeekTypeForm
        open={weekTypeFormOpen}
        setOpen={() => setWeekTypeFormOpen(false)}
        initialValues={currentWeekType}
      />
    </div>
  );
}

export default WeekTypeArea;
