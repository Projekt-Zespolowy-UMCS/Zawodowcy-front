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
    Drawer,
    List,
    ListItem,
    ListItemText,
    ListItemButton,
    Divider,
    MenuList,
    MenuItem,
    Switch
} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import { makeStyles, createStyles } from '@mui/styles';
import { blue } from "@mui/material/colors";
import { useTheme } from '@mui/material/styles';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
/*
const useStyles = makeStyles((theme: Theme) => ({
    root: {
        // display: 'flex',
    },
    drawer: {
        width: 250,
        background: 600
    },
    navlinks: {
        
        display: "flex",
    },
    link: {
        textDecoration: "none",
        color: "white",
        fontSize: "20px",
    },
    list: {
        width: 250,
        justify: "center"
    },
    fullList: {
        width: "auto"
    },
    paper: {
        background: "blue"
    },
    icon: {
        color: "white"
    }
}))
*/
interface DrawerProps {
    isOpen?: boolean,
    toggleDrawerState?: any,
}

const MainDrawer: FC<DrawerProps> = (props) => {
    // const classes = useStyles();

    const handleClickAway = () => {
        if (props.isOpen) props.toggleDrawerState();
    }
    return (
        <ClickAwayListener onClickAway={handleClickAway} >


            {props.isOpen ? (
                <Drawer
                    variant="persistent"
                    anchor="right"
                    open={props.isOpen}
                    onClose={props.toggleDrawerState}
                >

                    <Toolbar>

                        <MenuList >
                            <MenuItem>
                                <DarkModeIcon />
                                <Switch />
                            </MenuItem>
                            <MenuItem component={Link} to={"/"} onClick={props.toggleDrawerState}>
                                <ListItemText> Home </ListItemText>
                            </MenuItem>
                            <Divider />
                            <MenuItem component={Link} to={"/callback"} onClick={props.toggleDrawerState}>
                                <ListItemText> Callback </ListItemText>
                            </MenuItem>
                            <Divider />
                            <MenuItem component={Link} to={"/login"} onClick={props.toggleDrawerState}>
                                <ListItemText> Login </ListItemText>
                            </MenuItem>
                            <Divider />
                        </MenuList>
                    </Toolbar>
                </Drawer>
            ) :
                <IconButton onClick={props.toggleDrawerState} >
                    <MenuIcon />
                </IconButton>}

        </ClickAwayListener >
    );
}

export default MainDrawer;