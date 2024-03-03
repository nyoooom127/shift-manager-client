import AddIcon from '@mui/icons-material/AddCircleOutline';
import EditIcon from '@mui/icons-material/Edit';
import { Card, CardContent, IconButton, Table } from '@mui/material';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import ConstraintType from '../../../Models/ConstraintType';
import { AppState } from '../../../Redux/AppState';
import ConstraintTypeForm from '../ConstraintTypeArea/ConstraintTypeForm/ConstraintTypeForm';
import './ConstraintTypeArea.css';

function ConstraintTypeArea(): JSX.Element {
  const allConstraintTypes = useSelector(
    (appState: AppState) => appState.constraintTypes
  );
  const [constraintTypeFormOpen, setConstraintTypeFormOpen] =
    useState<boolean>(false);
  const [isNew, setIsNew] = useState<boolean>(false);
  const [currentConstraintType, setCurrentConstraintType] =
    useState<ConstraintType>();

  function handleConstraintTypeClick(
    constraintType: ConstraintType,
    isNewConstraintType: boolean
  ) {
    setCurrentConstraintType(constraintType);
    setConstraintTypeFormOpen(true);
    setIsNew(isNewConstraintType);
  }

  return (
    <div className="ConstraintTypeArea">
      <Card raised={true} className="Card">
        <CardContent>
          <div className="title">
            אילוצים
            <IconButton
              size="large"
              className="addButton"
              onClick={() =>
                handleConstraintTypeClick(new ConstraintType(''), true)
              }
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
              {[...allConstraintTypes].sort().map((constraintType) => (
                <tr key={constraintType.id}>
                  <td className="flex1">{constraintType.name}</td>
                  {/* <td className="flex3">
                      {moment(constraintType.startDate).format("lll")}
                    </td>
                    <td className="flex3">
                      {moment(constraintType.endDate).format("lll")}
                    </td>
                    <td className="flex4">{constraintType.comment}</td> */}
                  <td className="flex1">
                    <IconButton
                      onClick={() =>
                        handleConstraintTypeClick(constraintType, false)
                      }
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
      <ConstraintTypeForm
        open={constraintTypeFormOpen}
        setOpen={() => setConstraintTypeFormOpen(false)}
        initialValues={currentConstraintType}
        isNew={isNew}
      />
    </div>
  );
}

export default ConstraintTypeArea;
