import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import User from "../../Models/User";
import UserType from "../../Models/UserType";
import { AppState } from "../../Redux/AppState";
import {
    Data,
    Order,
    getComparator,
    mapUserToSummary,
    stableSort,
} from "../../Utils/SummaryUtils";
import UserFilter, {
    UserFilterFormFields,
} from "../UserArea/UserFilter/UserFilter";
import "./SummaryArea.css";
import SummaryTableHeader from "./SummaryTableHeader/SummaryTableHeader";

export default function SummaryArea() {
  const allUsers = useSelector((appState: AppState) => appState.users);
  const allShiftTypes = useSelector(
    (appState: AppState) => appState.shiftTypes
  );
  const [rows, setRows] = useState<Data[]>([]);
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<keyof Data>("fullName");
  const [page, setPage] = React.useState(0);
  const dense = true;
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [userTypes, setUserTypes] = useState<UserType[]>([]);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    setRows(
      (users.length > 0 ? users : allUsers)
        .filter((user) => {
          return (
            user.active &&
            (userTypes.length === 0 ||
              user.types.some((type) =>
                userTypes.some((userType) => userType.id === type.id)
              ))
          );
        })
        .map((user) => mapUserToSummary(user, allShiftTypes))
    );
  }, [allUsers, userTypes, users, allShiftTypes]);

  function onSubmitFilter(values: UserFilterFormFields) {
    setUserTypes(values.types);
    setUsers(values.users);
  }

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = Math.max(0, (1 + page) * rowsPerPage - rows.length);

  const visibleRows = React.useMemo(
    () =>
      stableSort(rows, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [order, orderBy, page, rowsPerPage, rows]
  );

  return (
    <Box
      sx={{ width: "100%", boxSizing: "border-box", padding: "1rem" }}
      className="SummaryArea"
    >
      <Paper sx={{ width: "100%", mb: 2 }}>
        <UserFilter onSubmit={onSubmitFilter} />
        <TableContainer sx={{ maxHeight: 440, boxSizing: "border-box" }}>
          <Table
            stickyHeader
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
          >
            <SummaryTableHeader
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              shiftTypes={allShiftTypes}
            />
            <TableBody>
              {visibleRows.map((row, index) => {
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
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
                    {allShiftTypes.map((shiftType) => (
                      <>
                        <TableCell
                          key={shiftType.id + "normal"}
                          align="right"
                          colSpan={1}
                          padding="none"
                        >
                          {row[`${shiftType.id}-normal`]}
                        </TableCell>
                        <TableCell
                          key={shiftType.id + "weekend"}
                          align="right"
                          colSpan={1}
                          padding="none"
                        >
                          {row[`${shiftType.id}-weekend`]}
                        </TableCell>
                      </>
                    ))}
                    <TableCell align="right" colSpan={1}>
                      {row.overall}
                    </TableCell>
                    <TableCell align="right" colSpan={1}>
                      {row.score}
                    </TableCell>
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          sx={{ direction: "ltr" }}
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}
