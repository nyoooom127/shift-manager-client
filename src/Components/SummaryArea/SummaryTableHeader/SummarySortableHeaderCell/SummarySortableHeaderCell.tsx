import Box from '@mui/material/Box';
import TableCell from '@mui/material/TableCell';
import TableSortLabel from '@mui/material/TableSortLabel';
import { visuallyHidden } from '@mui/utils';
import { UUID } from 'crypto';
import React, { useMemo } from 'react';
import { NumShifts } from '../../../../Models/User';
import {
  DayType,
  Order,
  PartialDataKey,
  SplitBy,
  calcId,
} from '../../../../Utils/SummaryUtils';

type SummarySortableHeaderCellProps = {
  disablePadding?: boolean;
  splitBy: SplitBy;
  shiftType?: UUID;
  dayType?: DayType;
  home?: keyof NumShifts;
  id?: PartialDataKey;
  rowSpan?: number;
  colSpan?: number;
  order: Order;
  orderBy: PartialDataKey;
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: PartialDataKey
  ) => void;
  children: React.ReactNode;
};

function SummarySortableHeaderCell({
  disablePadding,
  id,
  splitBy,
  shiftType,
  dayType,
  home,
  rowSpan = 1,
  colSpan = 1,
  order,
  orderBy,
  onRequestSort,
  children,
}: SummarySortableHeaderCellProps): JSX.Element {
  const createSortHandler =
    (property: PartialDataKey) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  const cellId = useMemo<PartialDataKey>(
    () => id || calcId(splitBy, shiftType, dayType, home),
    [id, dayType, home, shiftType, splitBy]
  );

  return (
    <TableCell
      rowSpan={rowSpan}
      colSpan={colSpan}
      align="center"
      padding={disablePadding ? 'none' : 'normal'}
      sortDirection={orderBy === cellId ? order : false}
    >
      <TableSortLabel
        active={orderBy === cellId}
        direction={orderBy === cellId ? order : 'asc'}
        onClick={createSortHandler(cellId)}
        hideSortIcon={orderBy !== cellId}
        style={{ height: '100%', width: '100%', justifyContent: 'center' }}
      >
        {children}
        {orderBy === cellId ? (
          <Box component="span" sx={visuallyHidden}>
            {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
          </Box>
        ) : null}
      </TableSortLabel>
    </TableCell>
  );
}

export default SummarySortableHeaderCell;
