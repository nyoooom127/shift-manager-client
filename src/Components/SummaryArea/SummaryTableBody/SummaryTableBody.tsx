import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { useMemo } from 'react';
import ShiftType from '../../../Models/ShiftType';
import {
    Data,
    Order,
    PartialDataKey,
    SplitBy,
    calcId,
    getComparator,
    getFieldValue,
    stableSort,
} from '../../../Utils/SummaryUtils';

interface SummaryTableBodyProps {
  page: number;
  rowsPerPage: number;
  order: Order;
  orderBy: PartialDataKey;
  rows: Data[];
  allShiftTypes: ShiftType[];
  splitBy: SplitBy;
}

function SummaryTableBody({
  page,
  rowsPerPage,
  order,
  orderBy,
  rows,
  allShiftTypes,
  ...props
}: SummaryTableBodyProps): JSX.Element {
  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = Math.max(0, (1 + page) * rowsPerPage - rows.length);

  const visibleRows = useMemo(
    () =>
      stableSort(rows, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [order, orderBy, page, rowsPerPage, rows]
  );

  return (
    <TableBody className="SummaryTableBody">
      {visibleRows.map((row, index) => {
        const labelId = `enhanced-table-checkbox-${index}`;

        return (
          <TableRow
            hover
            role="checkbox"
            tabIndex={-1}
            key={row.id}
            style={{ height: `${100 / rowsPerPage}%` }}
          >
            <TableCell align="right" colSpan={1}>
              {index + 1 + page * rowsPerPage}
            </TableCell>
            <TableCell
              id={labelId}
              scope="row"
              padding="none"
              align="right"
              colSpan={1}
            >
              {row.fullName}
            </TableCell>
            <TableCell align="right" colSpan={1}>
              {row.overall}
            </TableCell>
            <TableCell align="right" colSpan={1}>
              {row.score}
            </TableCell>
            {(props.splitBy.type ? allShiftTypes : [new ShiftType()]).map(
              (shiftType) =>
                props.splitBy.day && props.splitBy.home ? (
                  <>
                    <TableCell
                      key={row.id + shiftType.id + 'weekdaynormal'}
                      align="right"
                      colSpan={1}
                      padding="none"
                    >
                      {getFieldValue(
                        row,
                        calcId(props.splitBy, shiftType.id, 'weekday', 'normal')
                      )}
                    </TableCell>
                    <TableCell
                      key={row.id + shiftType.id + 'weekdayhome'}
                      align="right"
                      colSpan={1}
                      padding="none"
                    >
                      {getFieldValue(
                        row,
                        calcId(props.splitBy, shiftType.id, 'weekday', 'home')
                      )}
                    </TableCell>
                    <TableCell
                      key={row.id + shiftType.id + 'weekendnormal'}
                      align="right"
                      colSpan={1}
                      padding="none"
                    >
                      {getFieldValue(
                        row,
                        calcId(props.splitBy, shiftType.id, 'weekend', 'normal')
                      )}
                    </TableCell>
                    <TableCell
                      key={row.id + shiftType.id + 'weekendhome'}
                      align="right"
                      colSpan={1}
                      padding="none"
                    >
                      {getFieldValue(
                        row,
                        calcId(props.splitBy, shiftType.id, 'weekend', 'home')
                      )}
                    </TableCell>
                  </>
                ) : props.splitBy.day || props.splitBy.home ? (
                  <>
                    <TableCell
                      key={`${row.id}${shiftType.id}${
                        props.splitBy.day ? 'weekday' : ''
                      }${props.splitBy.home ? 'normal' : ''}`}
                      align="right"
                      colSpan={1}
                      padding="none"
                    >
                      {getFieldValue(
                        row,
                        calcId(props.splitBy, shiftType.id, 'weekday', 'normal')
                      )}
                    </TableCell>
                    <TableCell
                      key={`${row.id}${shiftType.id}${
                        props.splitBy.day ? 'weekend' : ''
                      }${props.splitBy.home ? 'home' : ''}`}
                      align="right"
                      colSpan={1}
                      padding="none"
                    >
                      {getFieldValue(
                        row,
                        calcId(props.splitBy, shiftType.id, 'weekend', 'home')
                      )}
                    </TableCell>
                  </>
                ) : (
                  props.splitBy.type && (
                    <TableCell
                      key={`${row.id}${shiftType.id}`}
                      align="right"
                      colSpan={1}
                      padding="none"
                    >
                      {getFieldValue(
                        row,
                        calcId(props.splitBy, shiftType.id, 'weekday', 'normal')
                      )}
                    </TableCell>
                  )
                )
            )}
          </TableRow>
        );
      })}
      {emptyRows > 0 && (
        <TableRow
          style={{
            height: 33 * emptyRows,
          }}
        >
          <TableCell colSpan={6} />
        </TableRow>
      )}
    </TableBody>
  );
}

export default SummaryTableBody;
