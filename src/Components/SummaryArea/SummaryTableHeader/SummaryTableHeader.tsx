import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import React, { useMemo } from 'react';
import ShiftType from '../../../Models/ShiftType';
import { Order, PartialDataKey, SplitBy } from '../../../Utils/SummaryUtils';
import SummarySortableHeaderCell from './SummarySortableHeaderCell/SummarySortableHeaderCell';

interface SummaryTableHeaderProps {
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: PartialDataKey
  ) => void;
  order: Order;
  orderBy: PartialDataKey;
  shiftTypes: ShiftType[];
  splitBy: SplitBy;
}

interface ShiftTypeHeaderProps {
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: PartialDataKey
  ) => void;
  order: Order;
  orderBy: PartialDataKey;
  shiftTypes: ShiftType[];
  keys: (keyof SplitBy)[];
  splitBy: SplitBy;
}

function ShiftTypeHeader(props: ShiftTypeHeaderProps): JSX.Element {
  return (
    <>
      {props.shiftTypes.map((shiftType) => {
        switch (props.keys.length) {
          case 1:
            return (
              <SummarySortableHeaderCell
                {...props}
                colSpan={1}
                disablePadding
                key={shiftType.id + 'name'}
                id={`${shiftType.id}`}
              >
                {shiftType.name}
                <br />({shiftType.score} / {shiftType.weekendScore})
              </SummarySortableHeaderCell>
            );
          case 2:
            return (
              <TableCell
                key={shiftType.id + 'name'}
                align="center"
                padding={'normal'}
                colSpan={2}
              >
                {shiftType.name}
              </TableCell>
            );
          case 3:
            return (
              <TableCell
                key={shiftType.id + 'name'}
                align="center"
                padding={'normal'}
                colSpan={4}
              >
                {shiftType.name}
              </TableCell>
            );
          default:
            return <></>;
        }
      })}
    </>
  );
}

interface DayTypeHeaderProps {
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: PartialDataKey
  ) => void;
  order: Order;
  orderBy: PartialDataKey;
  shiftTypes: ShiftType[];
  keys: (keyof SplitBy)[];
  splitBy: SplitBy;
}

function DayTypeHeader(props: DayTypeHeaderProps): JSX.Element {
  return (
    <>
      {(props.splitBy.type ? props.shiftTypes : [new ShiftType()]).map(
        (shiftType) =>
          props.splitBy.home ? (
            <>
              <TableCell
                align="center"
                padding={'normal'}
                colSpan={2}
                key={shiftType.id + 'weekday'}
                id={`${shiftType.id}-weekday`}
              >
                רגיל
              </TableCell>
              <TableCell
                align="center"
                padding={'normal'}
                colSpan={2}
                key={shiftType.id + 'weekend'}
                id={`${shiftType.id}-weekend`}
              >
                סופ"ש
              </TableCell>
            </>
          ) : (
            <>
              <SummarySortableHeaderCell
                {...props}
                colSpan={1}
                disablePadding
                key={shiftType.id + 'weekday'}
                shiftType={shiftType.id}
                dayType="weekday"
              >
                רגיל
                {props.splitBy.type && (
                  <>
                    <br />({shiftType.score})
                  </>
                )}
              </SummarySortableHeaderCell>
              <SummarySortableHeaderCell
                {...props}
                colSpan={1}
                disablePadding
                key={shiftType.id + 'weekend'}
                shiftType={shiftType.id}
                dayType="weekend"
              >
                סופ"ש
                {props.splitBy.type && (
                  <>
                    <br />({shiftType.weekendScore})
                  </>
                )}
              </SummarySortableHeaderCell>
            </>
          )
      )}
    </>
  );
}

interface HomeHeaderProps {
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: PartialDataKey
  ) => void;
  order: Order;
  orderBy: PartialDataKey;
  shiftTypes: ShiftType[];
  keys: (keyof SplitBy)[];
  splitBy: SplitBy;
}

function HomeHeader(props: HomeHeaderProps): JSX.Element {
  return (
    <>
      {(props.splitBy.type ? props.shiftTypes : [new ShiftType()]).map(
        (shiftType) =>
          props.splitBy.day ? (
            <>
              <SummarySortableHeaderCell
                {...props}
                colSpan={1}
                disablePadding
                key={shiftType.id + 'weekdaynormal'}
                shiftType={shiftType.id}
                dayType="weekday"
                home="normal"
              >
                נוכח
                {props.splitBy.type && (
                  <>
                    <br />({shiftType.score})
                  </>
                )}
              </SummarySortableHeaderCell>
              <SummarySortableHeaderCell
                {...props}
                colSpan={1}
                disablePadding
                key={shiftType.id + 'weekdayhome'}
                shiftType={shiftType.id}
                dayType="weekday"
                home="home"
              >
                בית
                {props.splitBy.type && (
                  <>
                    <br />({shiftType.score * 0.5})
                  </>
                )}
              </SummarySortableHeaderCell>
              <SummarySortableHeaderCell
                {...props}
                colSpan={1}
                disablePadding
                key={shiftType.id + 'weekendnormal'}
                shiftType={shiftType.id}
                dayType="weekend"
                home="normal"
              >
                נוכח
                {props.splitBy.type && (
                  <>
                    <br />({shiftType.weekendScore})
                  </>
                )}
              </SummarySortableHeaderCell>
              <SummarySortableHeaderCell
                {...props}
                colSpan={1}
                disablePadding
                key={shiftType.id + 'weekendhome'}
                shiftType={shiftType.id}
                dayType="weekend"
                home="home"
              >
                בית
                {props.splitBy.type && (
                  <>
                    <br />({shiftType.weekendScore * 0.5})
                  </>
                )}
              </SummarySortableHeaderCell>
            </>
          ) : (
            <>
              <SummarySortableHeaderCell
                {...props}
                colSpan={1}
                disablePadding
                key={shiftType.id + 'normal'}
                shiftType={shiftType.id}
                home="normal"
              >
                נוכח
                {props.splitBy.type && (
                  <>
                    <br />({shiftType.score})
                  </>
                )}
              </SummarySortableHeaderCell>
              <SummarySortableHeaderCell
                {...props}
                colSpan={1}
                disablePadding
                key={shiftType.id + 'home'}
                shiftType={shiftType.id}
                home="home"
              >
                בית
                {props.splitBy.type && (
                  <>
                    <br />({shiftType.score * 0.5})
                  </>
                )}
              </SummarySortableHeaderCell>
            </>
          )
      )}
    </>
  );
}

function SummaryTableHeader(props: SummaryTableHeaderProps): JSX.Element {
  const keys = useMemo<(keyof SplitBy)[]>(
    () =>
      Object.keys(props.splitBy)
        .filter((key) => props.splitBy[key as keyof SplitBy])
        .map((key) => key as keyof SplitBy),
    [props.splitBy]
  );
  const numRows = useMemo<number>(() => keys.length || 1, [keys]);
  const headerRows = useMemo<JSX.Element[]>(() => {
    const tempRows = [];

    if (props.splitBy.type) {
      tempRows.push(<ShiftTypeHeader {...props} keys={keys} />);
    }
    if (props.splitBy.day) {
      tempRows.push(<DayTypeHeader {...props} keys={keys} />);
    }
    if (props.splitBy.home) {
      tempRows.push(<HomeHeader {...props} keys={keys} />);
    }

    return tempRows;
  }, [keys, props]);

  return (
    <TableHead>
      <TableRow>
        <TableCell align="center" rowSpan={numRows} colSpan={1}>
          מס'
        </TableCell>
        <SummarySortableHeaderCell
          id="fullName"
          {...props}
          rowSpan={numRows}
          colSpan={1}
        >
          שם
        </SummarySortableHeaderCell>
        <SummarySortableHeaderCell
          id="overall"
          disablePadding
          {...props}
          rowSpan={numRows}
          colSpan={1}
        >
          סה"כ
        </SummarySortableHeaderCell>
        <SummarySortableHeaderCell
          id="score"
          disablePadding
          {...props}
          rowSpan={numRows}
          colSpan={1}
        >
          ניקוד
        </SummarySortableHeaderCell>
        {headerRows.length > 0 && headerRows[0]}
      </TableRow>
      {headerRows.length > 1 &&
        headerRows.slice(1).map((row, index) => (
          <TableRow key={index} className="InnerRow">
            {row}
          </TableRow>
        ))}
    </TableHead>
  );
}

export default SummaryTableHeader;
