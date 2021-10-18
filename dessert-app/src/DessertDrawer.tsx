import React, {useState, useEffect} from 'react';
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

interface Props {
    currentDessert: Dessert,
    onClose: () => void,
    handleSave: (a: Dessert) => void,
    open: boolean
}

export interface Dessert {
    name: string,
    calories: number,
    fat: number,
    carbs: number,
    protein: number,
    [key: string]: any
}

const DessertDrawer = (props: Props) => {

    const classes = useStyles();
    const [dessert, setDessert] = useState(props.currentDessert)

    useEffect(() => {
        if(props.currentDessert) {
          setDessert(props.currentDessert);
        }
    },[props.currentDessert])

    const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        const { name, value } = e.currentTarget
        setDessert({ ...dessert, [name]: value })
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
                    <Button onClick={() => props.handleSave(dessert)} color="primary">
                        Save
                    </Button>
                </Grid>
            </Grid>
        </Drawer>
    )

}

export default DessertDrawer;