import { FC, ChangeEvent, useState } from 'react';
import { format } from 'date-fns';
import numeral from 'numeral';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import {
 Card,
 CardHeader,
 Divider,
 IconButton,
 Table,
 TableBody,
 TableCell,
 TableContainer,
 TableHead,
 TableRow,
 Tooltip,
 Typography,
 useTheme
} from '@mui/material';

const CustomTable = () => {
 const theme = useTheme();
 return (
  <Card>
   <CardHeader title="Recent Orders" />
   <Divider />
   <TableContainer>
    <Table>
     <TableHead>
      <TableRow>
       <TableCell>Order Details</TableCell>
       <TableCell>Order ID</TableCell>
       <TableCell>Source</TableCell>
       <TableCell align="right">Amount</TableCell>
       <TableCell align="right">Status</TableCell>
       <TableCell align="right">Actions</TableCell>
      </TableRow>
     </TableHead>
     <TableBody>
      <TableRow>
       <TableCell>
        <Typography
         variant="body1"
         fontWeight="bold"
         color="text.primary"
         gutterBottom
         noWrap
        >
         asd
        </Typography>
        <Typography variant="body2" color="text.secondary" noWrap>
         fecha
        </Typography>
       </TableCell>
       <TableCell>
        <Typography
         variant="body1"
         fontWeight="bold"
         color="text.primary"
         gutterBottom
         noWrap
        >
         order
        </Typography>
       </TableCell>
       <TableCell>
        <Typography
         variant="body1"
         fontWeight="bold"
         color="text.primary"
         gutterBottom
         noWrap
        >
         asd
        </Typography>
        <Typography variant="body2" color="text.secondary" noWrap>
         qwe
        </Typography>
       </TableCell>
       <TableCell align="right">
        <Typography
         variant="body1"
         fontWeight="bold"
         color="text.primary"
         gutterBottom
         noWrap
        >
         ert
        </Typography>
        <Typography variant="body2" color="text.secondary" noWrap>
         123
        </Typography>
       </TableCell>
       <TableCell align="right">dfgggg</TableCell>
       <TableCell align="right">
        <Tooltip title="Edit Order" arrow>
         <IconButton
          sx={{
           '&:hover': {
            background: theme.colors.primary.lighter
           },
           color: theme.palette.primary.main
          }}
          color="inherit"
          size="small"
         >
          <EditTwoToneIcon fontSize="small" />
         </IconButton>
        </Tooltip>
        <Tooltip title="Delete Order" arrow>
         <IconButton
          sx={{
           '&:hover': { background: theme.colors.error.lighter },
           color: theme.palette.error.main
          }}
          color="inherit"
          size="small"
         >
          <DeleteTwoToneIcon fontSize="small" />
         </IconButton>
        </Tooltip>
       </TableCell>
      </TableRow>
     </TableBody>
    </Table>
   </TableContainer>
   {/* <Box p={2}>
    <TablePagination
     component="div"
     count={filteredCryptoOrders.length}
     onPageChange={handlePageChange}
     onRowsPerPageChange={handleLimitChange}
     page={page}
     rowsPerPage={limit}
     rowsPerPageOptions={[5, 10, 25, 30]}
    />
   </Box> */}
  </Card>
 );
};

export default CustomTable;
