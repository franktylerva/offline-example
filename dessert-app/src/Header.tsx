import { AppBar, Toolbar, Typography } from "@mui/material";
import React from "react";
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
    typographyStyles: {
        flex: 1
    }
}));

interface Props {
    user: User
}

export interface User {
    name: string
}

const Header = (props: Props) => {
    const classes = useStyles();
    return <AppBar position="static">
        <Toolbar>
            <Typography className={classes.typographyStyles}>PouchDB / CouchDB</Typography>
            <Typography>{props.user.name}&nbsp;</Typography>
        </Toolbar>
    </AppBar>
}

export default Header;