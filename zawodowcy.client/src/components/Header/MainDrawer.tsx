import { FC } from "react";
import {
    IconButton,
    Drawer} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import MainDrawerMenu from "./MainDrawerMenu"

interface IDrawerProps {
    isOpen?: boolean,
    toggleDrawerState?: any,
}

const MainDrawer: FC<IDrawerProps> = (props) => {

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
                    <MainDrawerMenu toggleDrawerState={props.toggleDrawerState} />
                </Drawer>
            ) :
                <IconButton onClick={props.toggleDrawerState} >
                    <MenuIcon />
                </IconButton>}

        </ClickAwayListener >
    );
}

export default MainDrawer;