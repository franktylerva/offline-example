import React, {useState} from 'react';
import { Grid, Fab } from '@mui/material';
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper } from '@mui/material';

import { makeStyles } from '@mui/styles';

import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import DessertDrawer from './DessertDrawer';

const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
    headerBar: {
        textAlign: 'right',
        marginTop: 10,
        marginBottom: 20
    }
  });

export default function DessertList(props) {

    const classes = useStyles();
    const [open, setOpen] = useState(false);

    const handleDrawerOpen = () => {
      setOpen(true)  
    };

    const handleDrawerClose = () => {
        setOpen(false)  
    }

    const handleEdit = async (id) => {

    };

    const handleDelete = async (id,rev) => {
    
    }

    return (
        <Grid>
            <Grid item xs={12} className={classes.headerBar}>
                <Fab size="small" color="primary" aria-label="add">
                  <AddIcon color="white" onClick={handleDrawerOpen}/>
                  <DessertDrawer open={open} onClose={handleDrawerClose}/>
                </Fab>
            </Grid>
            <Grid>
                <TableContainer component={Paper}>
                    <Table className={classes.table} size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Dessert (100g serving)</TableCell>
                                <TableCell align="right">Calories</TableCell>
                                <TableCell align="right">Fat&nbsp;(g)</TableCell>
                                <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                                <TableCell align="right">Protein&nbsp;(g)</TableCell>
                                <TableCell align="center">Actions&nbsp;</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {props.data.map((row) => (
                            <TableRow key={row.doc._id}>
                                <TableCell component="th" scope="row">
                                    {row.doc.name}
                                </TableCell>
                                <TableCell align="right">{row.doc.calories}</TableCell>
                                <TableCell align="right">{row.doc.fat}</TableCell>
                                <TableCell align="right">{row.doc.carbs}</TableCell>
                                <TableCell align="right">{row.doc.protein}</TableCell>
                                <TableCell align="right" width={88}>
                                    <IconButton onClick={() => handleDelete(row.doc._id,row.doc._rev)}>
                                        <DeleteIcon fontSize="small" color="secondary"/>
                                    </IconButton>
                                    <IconButton onClick={() => handleEdit(row.doc._id)}>
                                        <EditIcon fontSize="small" color="primary"/>
                                    </IconButton>
                                </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
        </Grid>
    )
}