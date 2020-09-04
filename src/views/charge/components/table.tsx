import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Table,Button,Paper} from '@material-ui/core';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { 
    ChargeToday
} from '@src/api/charge'
// import { Button } from '@material-ui/core';
interface Column {
  prop: 'number' | 'name' | 'total' | 'profit'|'delete'|'rate'
  label: string;
  minWidth?: number;
  align?: 'center';
  render?:Function
}

const columns: Column[] = [
  { prop: 'number', label: '编号', minWidth: 50 },
  { prop: 'name', label: '账务类别', minWidth: 100 },
  { prop: 'total', label: '营收', minWidth: 50 },
  { prop: 'profit', label: '利润', minWidth: 50 },
  { prop: 'rate', label: '利润率', minWidth: 50 },
  { prop: 'delete', label: '操作', minWidth: 80 },
];


const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
});

export default function StickyHeadTable({rows,deleteItem}:{rows:ChargeToday[],deleteItem:Function}) {
  const classes = useStyles();
  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.prop}
                  align='center'
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                  {columns.map((column,index) => {
                    return (
                      <TableCell key={index}  align='center'>
                         {   
                             column.prop == 'delete'? <Button color='secondary' onClick={()=>deleteItem(row.id)}>删除</Button>: <span className={`${column.prop=='profit'&&'success-color'}`}>{row[column.prop]}</span>
                         }
                      </TableCell>
                    );
                  })}
                  {/* <TableCell key={row.id}  align={column.align}>
                          <span className={`${column.prop=='profit'&&'success-color'}`}>{row[column.prop]}</span>
                  </TableCell> */}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
