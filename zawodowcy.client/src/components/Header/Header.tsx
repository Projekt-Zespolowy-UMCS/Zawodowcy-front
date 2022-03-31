import React, { FC, useState } from "react";
import { Link } from "react-router-dom";
import {
    AppBar,
    Toolbar,
    IconButton,
    CssBaseline,
    Button,
    Typography,
    Theme,
    useMediaQuery,
    Switch,
    Divider
} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import { makeStyles, createStyles } from '@mui/styles';
import { blue } from "@mui/material/colors";
import { useTheme } from '@mui/material/styles';
import MainDrawer from "./MainDrawer"

import DarkModeIcon from '@mui/icons-material/DarkMode';
const useStyles = makeStyles((theme: Theme) => ({
    title: {
        flexGrow: 1,
    },
    navlinks: {
        marginLeft: theme.spacing(10),
        display: "flex",
    },
    logo: {
        flexGrow: "1",
        cursor: "pointer",
    },
    link: {
        textDecoration: "none",
        color: "white",
        fontSize: "20px",
        marginLeft: theme.spacing(10),

    },
}));

const Header: FC = () => {
    const classes = useStyles();
    const handleOpen = () => {
        alert("XD")
    }
    const theme = useTheme();
    console.log(theme);

    const isMatch = useMediaQuery(theme.breakpoints.down("md"));

    const [isOpen, setOpen] = useState(false)

    const toggleDrawerState = () => {
        setOpen(isOpen ? false : true)
        console.log(isOpen)
    }

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h4" className={classes.logo}>
                    Zawodowcy.pl
                </Typography>
                {!isMatch && (
                    <>
                        <div className={classes.navlinks}>
                            <Link to="/" className={classes.link}>
                                Home
                            </Link>
                            <Link to="/callback" className={classes.link}>
                                Callback
                            </Link>
                            <Link to="/login" className={classes.link}>
                                Login
                            </Link>

                            <Divider />
                            <DarkModeIcon />
                            <Switch />
                        </div>

                    </>
                )}
                {isMatch && (<MainDrawer isOpen={isOpen} toggleDrawerState={toggleDrawerState} />)}
            </Toolbar>
        </AppBar>
    )
}

export default Header;