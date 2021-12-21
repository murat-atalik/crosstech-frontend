import './tableList.scss';

import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from '@mui/material';
import ActionType from 'components/ActionType/ActionType';
import React from 'react';

const TableList = function ({ tasks, title }) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div className="table-list-container">
      <div className="table-list-paper">
        <div className="table-list-title">
          <h2>{title}</h2>
        </div>
        <TableContainer component={Paper} className="table-container">
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell align="left">Title</TableCell>
                <TableCell align="left">Description</TableCell>
                <TableCell align="left">Status</TableCell>
                <TableCell align="left">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tasks
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <TableRow
                    key={row.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell align="left" className="table-title">
                      <p>{row.title}</p>
                    </TableCell>
                    <TableCell className="table-description" align="left">
                      <p> {row.description}</p>
                    </TableCell>
                    <TableCell align="left">
                      <p className={`table-status-${row.status}`}>
                        {(row.status === 0 && 'Pending') ||
                          (row.status === 1 && 'Completed') ||
                          (row.status === 2 && 'Rejected')}
                      </p>
                    </TableCell>
                    <TableCell align="left">
                      <ActionType
                        task={row}
                        isPending={row.status === 0}
                        isDetails={false}
                      />
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          className="table-container-pagination"
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={tasks.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </div>
    </div>
  );
};

export default TableList;
