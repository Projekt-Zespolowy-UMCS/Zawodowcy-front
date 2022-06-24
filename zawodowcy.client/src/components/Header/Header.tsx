import { FC, useState } from "react";
import { Link } from "react-router-dom";
import {
    AppBar,
    Toolbar,
    Typography,
    Theme,
    useMediaQuery,
    Divider
} from "@mui/material";
import { makeStyles } from '@mui/styles';
import { useTheme } from '@mui/material/styles';
import MainDrawer from "./MainDrawer"
import ThemeSwitch from "../ThemeMode/ThemeSwitch";

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
                            <Link to="/register" className={classes.link}>
                                Register
                            </Link>
                            <Link to="/offers" className={classes.link}>
                                Offers
                            </Link>
                            <Link to="/offers/add" className={classes.link}>
                                Create Offer
                            </Link>
                            <Divider />
                            <div className={classes.link}>
                                <ThemeSwitch />
                            </div>
                        </div>

                    </>
                )}
                {isMatch && (<MainDrawer isOpen={isOpen} toggleDrawerState={toggleDrawerState} />)}
            </Toolbar>
        </AppBar>
    )
}

export default Header;