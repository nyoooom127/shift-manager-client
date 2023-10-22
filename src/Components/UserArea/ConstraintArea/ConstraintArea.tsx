import AddIcon from "@mui/icons-material/AddCircleOutline";
import EditIcon from "@mui/icons-material/Edit";
import { Card, CardContent, IconButton, Table } from "@mui/material";
import moment from "moment";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Constraint from "../../../Models/Constraint";
import { AppState } from "../../../Redux/AppState";
import ConstraintForm from "../ConstraintArea/ConstraintForm/ConstraintForm";
import "./ConstraintArea.css";

function ConstraintArea(): JSX.Element {
  const user = useSelector((appState: AppState) => appState.currentUser);
  const allConstraints = useSelector(
    (appState: AppState) => appState.constraints
  );
  const [constraintFormOpen, setConstraintFormOpen] = useState<boolean>(false);
  const [constraints, setConstraints] = useState<Constraint[]>([]);
  const [currentConstraint, setCurrentConstraint] = useState<Constraint>();

  useEffect(() => {
    setConstraints(
      allConstraints.filter((constraint) =>
        user.constraints.some(
          (userConstraint) => userConstraint.id === constraint.id
        )
      )
    );
  }, [user, allConstraints]);

  function handleConstraintClick(constraint: Constraint) {
    setCurrentConstraint(constraint);
    setConstraintFormOpen(true);
  }

  return (
    <div className="ConstraintArea">
      <Card raised={true} className="Card">
        <CardContent>
          <div className="title">
            אילוצים
            <IconButton
              size="large"
              className="addButton"
              onClick={() =>
                handleConstraintClick(
                  new Constraint(undefined, moment(), moment(), user.id, "")
                )
              }
            >
              <AddIcon />
            </IconButton>
          </div>
          <Table>
            <thead>
              <tr>
                <th className="flex1">סוג אילוץ</th>
                <th className="flex3">התחלה</th>
                <th className="flex3">סיום</th>
                <th className="flex4">הערה</th>
                <th className="flex1">ערוך</th>
              </tr>
            </thead>
            <tbody>
              {constraints
                .sort(
                  (a, b) =>
                    moment(a.startDate).unix() - moment(b.startDate).unix()
                )
                .map((constraint) => (
                  <tr>
                    <td className="flex1">{constraint.type.name}</td>
                    <td className="flex3">
                      {moment(constraint.startDate).format("lll")}
                    </td>
                    <td className="flex3">
                      {moment(constraint.endDate).format("lll")}
                    </td>
                    <td className="flex4">{constraint.comment}</td>
                    <td className="flex1">
                      <IconButton
                        onClick={() => handleConstraintClick(constraint)}
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
      <ConstraintForm
        open={constraintFormOpen}
        setOpen={() => setConstraintFormOpen(false)}
        initialValues={currentConstraint}
      />
    </div>
  );
}

export default ConstraintArea;
