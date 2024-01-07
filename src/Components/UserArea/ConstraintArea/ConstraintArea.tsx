import AddIcon from "@mui/icons-material/AddCircleOutline";
import EditIcon from "@mui/icons-material/Edit";
import { Card, CardContent, IconButton, Table } from "@mui/material";
import moment, { Moment } from "moment";
import { useState } from "react";
import Constraint from "../../../Models/Constraint";
import User from "../../../Models/User";
import { isConstraintInMonth } from "../../../Utils/ConstraintUtils";
import ConstraintForm from "../ConstraintArea/ConstraintForm/ConstraintForm";
import "./ConstraintArea.css";

interface ConstraintAreaProps {
  user: User;
}

function ConstraintArea({ user }: ConstraintAreaProps): JSX.Element {
  // const allConstraints = useSelector(
  //   (appState: AppState) => appState.constraints
  // );
  const [date, setDate] = useState<Moment>(moment().startOf("M"));
  // const [date, setDate] = useState<Moment>(moment().date(0).startOf("D"));
  const [constraintFormOpen, setConstraintFormOpen] = useState<boolean>(false);
  // const [constraints, setConstraints] = useState<Constraint[]>([]);
  const [currentConstraint, setCurrentConstraint] = useState<Constraint>();

  // useEffect(() => {
  //   setConstraints(
  //     allConstraints.filter((constraint) =>
  //       user.constraints.some(
  //         (userConstraint) => userConstraint.id === constraint.id
  //       )
  //     )
  //   );
  // }, [user, allConstraints]);

  function handleConstraintClick(constraint: Constraint) {
    setCurrentConstraint(constraint);
    setConstraintFormOpen(true);
  }

  function handleNextClick() {
    setDate(date.clone().add(1, "month"));
  }

  function handlePrevClick() {
    setDate(date.clone().subtract(1, "month"));
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
              <tr className="buttons">
                <button onClick={handlePrevClick}>{"<"}</button>
                {date.format("MMMM YYYY")}
                <button onClick={handleNextClick}>{">"}</button>
              </tr>
              <tr>
                <th className="flex1">סוג אילוץ</th>
                <th className="flex3">התחלה</th>
                <th className="flex3">סיום</th>
                {/* <th className="flex1">מס' אילוצים</th> */}
                <th className="flex4">הערה</th>
                <th className="flex1">ערוך</th>
              </tr>
            </thead>
            <tbody>
              {[...user.constraints]
                .filter((constraint) => isConstraintInMonth(date, constraint))
                .sort(
                  (a, b) =>
                    moment(b.startDate).unix() - moment(a.startDate).unix()
                )
                .map((constraint) => (
                  <tr key={constraint.id}>
                    <td className="flex1">{constraint.type.name}</td>
                    <td className="flex3">
                      {moment(constraint.startDate).format("lll")}
                    </td>
                    <td className="flex3">
                      {moment(constraint.endDate).format("lll")}
                    </td>
                    {/* <td className="flex1">
                      {countConstraintDays(constraint)}
                    </td> */}
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
        constraints={[...user.constraints]}
      />
    </div>
  );
}

export default ConstraintArea;
