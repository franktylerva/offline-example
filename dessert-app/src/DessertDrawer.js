import React, {useState} from 'react';
import { Drawer, Grid, TextField, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
    paper: { 
        width: 500,
        padding: 20,
        height: 'calc(50% - 64px)',
        top: 64
    },
    footer: {
        textAlign: 'right',
        paddingTop: 10
    },
    typographyStyles: {
        flex: 1,
        fontSize: 10
    }
});

const DessertDrawer = (props) => {

    const classes = useStyles();

    const dessert = {name: "name", calories: 1, fat: 1, carbs: 1};

    const handleInputChange = (event) => {
        
    }
    
    const saveDessert = async () => {
    
    }

    return (
        <Drawer classes={{ paper: classes.paper }} anchor="right" open={props.open} onClose={props.onClose}>
            <Grid container direction="column">
                <Grid item xs={12}>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        name="name" 
                        label="Dessert Name"
                        type="text"
                        value={dessert.name}
                        fullWidth
                        onChange={handleInputChange}
                    />
                    <TextField
                        margin="dense"
                        id="calories" 
                        name="calories" 
                        label="calories"
                        type="text"
                        value={dessert.calories}
                        fullWidth 
                        onChange={handleInputChange}
                    />
                    <TextField
                        margin="dense"
                        id="fat" 
                        name="fat" 
                        label="Fat"
                        type="text"
                        value={dessert.fat}
                        fullWidth 
                        onChange={handleInputChange}
                    />
                    <TextField
                        margin="dense"
                        id="carbs" 
                        name="carbs" 
                        label="Carbs"
                        type="text"
                        value={dessert.carbs}
                        fullWidth 
                        onChange={handleInputChange}
                    />
                    <TextField
                        margin="dense"
                        id="protein" 
                        name="protein" 
                        label="Protein"
                        type="text"
                        value={dessert.protein}
                        fullWidth 
                        onChange={handleInputChange}
                    />
                    <Button onClick={props.onClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={saveDessert} color="primary">
                        Save
                    </Button>
                </Grid>
            </Grid>
        </Drawer>
    )

}

export default DessertDrawer;