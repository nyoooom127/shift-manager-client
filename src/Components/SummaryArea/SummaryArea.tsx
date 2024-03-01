import { Toolbar } from '@mui/material';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import React, { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import User from '../../Models/User';
import UserType from '../../Models/UserType';
import { AppState } from '../../Redux/AppState';
import {
  Order,
  PartialDataKey,
  SplitBy,
  mapUserToSummary
} from '../../Utils/SummaryUtils';
import UserFilter, {
  UserFilterFormFields,
} from '../UserArea/UserFilter/UserFilter';
import DetailLevelForm from './DetailLevelForm/DetailLevelForm';
import './SummaryArea.css';
import SummaryTableBody from './SummaryTableBody/SummaryTableBody';
import SummaryTableHeader from './SummaryTableHeader/SummaryTableHeader';

export default function SummaryArea() {
  const allUsers = useSelector((appState: AppState) => appState.users);
  const allShiftTypes = useSelector(
    (appState: AppState) => appState.shiftTypes
  );
  const [order, setOrder] = useState<Order>('desc');
  const [orderBy, setOrderBy] = useState<PartialDataKey>('score');
  const [page, setPage] = useState(0);
  const [splitBy, setSplitBy] = useState<SplitBy>({
    day: false,
    home: false,
    type: false,
  });
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [userTypes, setUserTypes] = useState<UserType[]>([]);
  const [users, setUsers] = useState<User[]>([]);

  const rows = useMemo(
    () =>
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
        .map((user) => mapUserToSummary(user, allShiftTypes)),
    [allUsers, userTypes, users, allShiftTypes]
  );

  function onSubmitFilter(values: UserFilterFormFields) {
    setUserTypes(values.types);
    setUsers(values.users);
    setPage(0);
  }

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: PartialDataKey
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
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

  return (
    <Box
      sx={{ width: '100%', boxSizing: 'border-box', padding: '1rem' }}
      className="SummaryArea"
    >
      <Paper sx={{ width: '100%', mb: 2 }}>
        <Toolbar
          sx={{
            pl: { sm: 2 },
            pr: { xs: 1, sm: 1 },
          }}
        >
          <UserFilter onSubmit={onSubmitFilter} />
          <DetailLevelForm splitBy={splitBy} onChangeSplitBy={setSplitBy} />
        </Toolbar>
        <TableContainer sx={{ maxHeight: '60vh', boxSizing: 'border-box' }}>
          <Table
            stickyHeader
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size="small"
          >
            <SummaryTableHeader
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              shiftTypes={allShiftTypes}
              splitBy={splitBy}
            />
            <SummaryTableBody
              allShiftTypes={allShiftTypes}
              order={order}
              orderBy={orderBy}
              page={page}
              rows={rows}
              rowsPerPage={rowsPerPage}
              splitBy={splitBy}
            />
          </Table>
        </TableContainer>
        <TablePagination
          sx={{ direction: 'ltr' }}
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
