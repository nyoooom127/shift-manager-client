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
        {props.shiftTypes.map((shiftType) => (
          <TableCell
            key={shiftType.id + "name"}
            align="center"
            padding={"normal"}
            colSpan={2}
          >
            {shiftType.name}
          </TableCell>
        ))}
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
      </TableRow>
      <TableRow className="InnerRow">
        {props.shiftTypes.map((shiftType) => (
          <>
            <SummarySortableHeaderCell
              {...props}
              colSpan={1}
              disablePadding
              key={shiftType.id + "normal"}
              id={`${shiftType.id}-normal`}
            >
              רגיל
              <br />({shiftType.score})
            </SummarySortableHeaderCell>
            <SummarySortableHeaderCell
              {...props}
              colSpan={1}
              disablePadding
              key={shiftType.id + "weekend"}
              id={`${shiftType.id}-weekend`}
            >
              סופ"ש
              <br />({shiftType.weekendScore})
            </SummarySortableHeaderCell>
          </>
        ))}
      </TableRow>
    </TableHead>
  );
}

export default SummaryTableHeader;
