
import { createTheme, ThemeProvider } from '@mui/material/styles';
import React, { FC } from "react";
import Cookies from 'js-cookie';

interface IColorModeContext {
    toggleColorMode: () => void;
    mode: string;
}

export const ColorModeContext = React.createContext<IColorModeContext>({
    toggleColorMode: () => { },
    mode: "light",
});


export const ColorModeContextProvider: FC = ({ children }) => {
    const localTheme = Cookies.get("theme");
    const initMode:"light" | "dark" = localTheme === "dark" || localTheme === "light" ? localTheme : "light"
    Cookies.set("theme", initMode);
    const [mode, setMode] = React.useState<"light" | "dark">(initMode);
    const colorMode = React.useMemo(
        () => ({
            toggleColorMode: () => {
                //for some reason if i save mode to the local storage it is the opossite of the current value of the theme xD
                Cookies.set("theme", mode === "dark" ? "light" : "dark");
                setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
                console.log("HEJ ", mode);
            },
            mode,
        }),
        [mode]
    );
    
    const theme = React.useMemo(
        () => 
        
        createTheme({
            palette: {
                mode
            }
        }), [mode]
    );

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                {children}
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
};

export const useColorMode = () => React.useContext(ColorModeContext);