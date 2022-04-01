
import { createTheme, ThemeProvider } from '@mui/material/styles';
import React, { FC } from "react";
interface IColorModeContext {
    toggleColorMode: () => void;
    mode: "light" | "dark";
}

export const ColorModeContext = React.createContext<IColorModeContext>({
    toggleColorMode: () => { },
    mode: "light",
});


export const ColorModeContextProvider: FC = ({ children }) => {
    const [mode, setMode] = React.useState<"light" | "dark">("light");
    const colorMode = React.useMemo(
        () => ({
            toggleColorMode: () => {
                setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
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

    console.log("XD "+ mode);
    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                {children}
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
};

export const useColorMode = () => React.useContext(ColorModeContext);