import React, { FC } from "react";
import { Link } from "react-router-dom";
import {
    Toolbar,
    IconButton,
    Drawer,
    ListItemText,
    Divider,
    MenuList,
    MenuItem,
    Switch
} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import ThemeSwitch from "../ThemeMode/ThemeSwitch";
import { ColorModeContext } from "../ThemeMode/ThemeContext";

interface IDrawerProps {
    toggleDrawerState: () => void;
}

export const MainDrawerMenu: FC<IDrawerProps> = (props) => {

    return (
        <Toolbar>
            <MenuList >
                <MenuItem>
                    <ThemeSwitch />
                </MenuItem>
                <MenuItem component={Link} to={"/"} onClick={props.toggleDrawerState}>
                    <ListItemText> Home </ListItemText>
                </MenuItem>
                <Divider />
                <MenuItem component={Link} to={"/register"} onClick={props.toggleDrawerState}>
                    <ListItemText> Register </ListItemText>
                </MenuItem>
                <Divider />
                <MenuItem component={Link} to={"/login"} onClick={props.toggleDrawerState}>
                    <ListItemText> Login </ListItemText>
                </MenuItem>
                <Divider />
            </MenuList>
        </Toolbar>
    )
}

export default MainDrawerMenu;