import { Switch } from "@mui/material";
import { FC, useContext } from "react";
import { ColorModeContext } from "../ThemeMode/ThemeContext";
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';

export const ThemeSwitch: FC = () => {
    const {mode, toggleColorMode} = useContext(ColorModeContext);

    return (
        <>
            <LightModeIcon />
            <Switch
                checked={(mode === "dark")}
                onChange={toggleColorMode}
            />
            <DarkModeIcon />
        </>
    );
}

export default ThemeSwitch;