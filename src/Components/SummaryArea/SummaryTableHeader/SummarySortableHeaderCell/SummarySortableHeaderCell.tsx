import Box from "@mui/material/Box";
import TableCell from "@mui/material/TableCell";
import TableSortLabel from "@mui/material/TableSortLabel";
import { visuallyHidden } from "@mui/utils";
import React from "react";
import { Data, Order } from "../../../../Utils/SummaryUtils";

type SummarySortableHeaderCellProps = {
  disablePadding?: boolean;
  id: keyof Data;
  rowSpan?: number;
  colSpan?: number;
  order: Order;
  orderBy: string;
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => void;
  children: React.ReactNode;
};

function SummarySortableHeaderCell({
  disablePadding,
  id,
  rowSpan = 1,
  colSpan = 1,
  order,
  orderBy,
  onRequestSort,
  children,
}: SummarySortableHeaderCellProps): JSX.Element {
  const createSortHandler =
    (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableCell
      rowSpan={rowSpan}
      colSpan={colSpan}
      align="center"
      padding={disablePadding ? "none" : "normal"}
      sortDirection={orderBy === id ? order : false}
    >
      <TableSortLabel
        active={orderBy === id}
        direction={orderBy === id ? order : "asc"}
        onClick={createSortHandler(id)}
        hideSortIcon={orderBy !== id}
      >
        {children}
        {orderBy === id ? (
          <Box component="span" sx={visuallyHidden}>
            {order === "desc" ? "sorted descending" : "sorted ascending"}
          </Box>
        ) : null}
      </TableSortLabel>
    </TableCell>
  );
}

export default SummarySortableHeaderCell;
