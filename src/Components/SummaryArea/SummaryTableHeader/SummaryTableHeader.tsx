import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import React from "react";
import ShiftType from "../../../Models/ShiftType";
import { Data, Order } from "../../../Utils/SummaryUtils";
import SummarySortableHeaderCell from "./SummarySortableHeaderCell/SummarySortableHeaderCell";

interface SummaryTableHeaderProps {
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => void;
  order: Order;
  orderBy: string;
  shiftTypes: ShiftType[];
}

function SummaryTableHeader(props: SummaryTableHeaderProps): JSX.Element {
  return (
    <TableHead>
      <TableRow>
        <TableCell align="center" rowSpan={2} colSpan={1}>
          מס'
        </TableCell>
        <SummarySortableHeaderCell
          id="fullName"
          {...props}
          rowSpan={2}
          colSpan={1}
        >
          שם
        </SummarySortableHeaderCell>
        <SummarySortableHeaderCell
          id="overall"
          disablePadding
          {...props}
          rowSpan={2}
          colSpan={1}
        >
          סה"כ
        </SummarySortableHeaderCell>
        <SummarySortableHeaderCell
          id="score"
          disablePadding
          {...props}
          rowSpan={2}
          colSpan={1}
        >
          ניקוד
        </SummarySortableHeaderCell>
        {props.shiftTypes.map((shiftType) => (
          <TableCell
            key={shiftType.id + "name"}
            align="center"
            padding={"normal"}
            colSpan={4}
          >
            {shiftType.name}
          </TableCell>
        ))}
      </TableRow>
      <TableRow className="InnerRow">
        {props.shiftTypes.map((shiftType) => (
          <>
            <SummarySortableHeaderCell
              {...props}
              colSpan={1}
              disablePadding
              key={shiftType.id + "weekdaynormal"}
              id={`${shiftType.id}-weekday-normal`}
            >
              רגיל נוכח
              <br />({shiftType.score})
            </SummarySortableHeaderCell>
            <SummarySortableHeaderCell
              {...props}
              colSpan={1}
              disablePadding
              key={shiftType.id + "weekdayhome"}
              id={`${shiftType.id}-weekday-home`}
            >
              רגיל מהבית
              <br />({shiftType.score * 0.5})
            </SummarySortableHeaderCell>
            <SummarySortableHeaderCell
              {...props}
              colSpan={1}
              disablePadding
              key={shiftType.id + "weekendnormal"}
              id={`${shiftType.id}-weekend-normal`}
            >
              סופ"ש נוכח
              <br />({shiftType.weekendScore})
            </SummarySortableHeaderCell>
            <SummarySortableHeaderCell
              {...props}
              colSpan={1}
              disablePadding
              key={shiftType.id + "weekendhome"}
              id={`${shiftType.id}-weekend-home`}
            >
              סופ"ש מהבית
              <br />({shiftType.weekendScore * 0.5})
            </SummarySortableHeaderCell>
          </>
        ))}
      </TableRow>
    </TableHead>
  );
}

export default SummaryTableHeader;
