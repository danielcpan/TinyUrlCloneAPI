import React from 'react';
import PropTypes from 'prop-types';
import format from 'date-fns/format';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

const VisitsTableBody = props => {
  function desc(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }
  
  function stableSort(array, cmp) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = cmp(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map(el => el[0]);
  }
  
  function getSorting(order, orderBy) {
    return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
  }

  const { visits, order, orderBy, page, rowsPerPage } = props;

  return (
    <TableBody>
      {stableSort(visits, getSorting(order, orderBy))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map(visit => (
          <TableRow
            hover
            key={visit._id}
          >
            <TableCell component="th" scope="row">{visit.ip}</TableCell>
            <TableCell align="right">{visit.city}</TableCell>
            <TableCell align="right">{visit.region}</TableCell>
            <TableCell align="right">{visit.country}</TableCell>
            <TableCell align="right">{visit.loc}</TableCell>
            <TableCell align="right">{(visit.isUnique) ? 'Yes' : 'No'}</TableCell>
            <TableCell align="right">{format(visit.createdAt, 'MMM DD, YYYY')}</TableCell>
          </TableRow>
        ))}
    </TableBody>
  );
}

export default VisitsTableBody;