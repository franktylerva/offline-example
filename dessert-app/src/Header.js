import { AppBar, Toolbar, Typography } from "@mui/material";
import React from "react";
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
    typographyStyles: {
        flex: 1
    }
}));

const Header = (props) => {
    const classes = useStyles();
    return <AppBar position="static">
        <Toolbar>
            <Typography className={classes.typographyStyles}>PouchDB / CouchDB</Typography>
            <Typography>{props.user.name}&nbsp;</Typography>
        </Toolbar>
    </AppBar>
}

export default Header;