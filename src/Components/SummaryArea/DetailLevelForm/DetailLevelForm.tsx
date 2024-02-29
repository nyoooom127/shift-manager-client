import { Checkbox, FormControlLabel } from '@mui/material';
import { SplitBy } from '../../../Utils/SummaryUtils';

interface DetailLevelFormProps {
  splitBy: SplitBy;
  onChangeSplitBy: (value: SplitBy) => void;
}

function DetailLevelForm(props: DetailLevelFormProps): JSX.Element {
  function handleChangeSplitBy(splitByKey: keyof SplitBy, checked: boolean) {
    props.onChangeSplitBy({ ...props.splitBy, [splitByKey]: checked });
  }

  return (
    <div className="DetailLevelForm">
      <FormControlLabel
        labelPlacement="end"
        label="סוג משמרת"
        control={
          <Checkbox
            checked={props.splitBy.type}
            onChange={(e, checked) => {
              handleChangeSplitBy('type', checked);
            }}
          />
        }
      />
      <FormControlLabel
        labelPlacement="end"
        label='רגיל / סופ"ש'
        control={
          <Checkbox
            checked={props.splitBy.day}
            onChange={(e, checked) => {
              handleChangeSplitBy('day', checked);
            }}
          />
        }
      />
      <FormControlLabel
        labelPlacement="end"
        label="נוכח / בית"
        control={
          <Checkbox
            checked={props.splitBy.home}
            onChange={(e, checked) => {
              handleChangeSplitBy('home', checked);
            }}
          />
        }
      />
    </div>
  );
}

export default DetailLevelForm;
