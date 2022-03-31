import './App.scss';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import UserManagerService, { UserManagerServiceContext } from "./components/Shared/UserManagerService";
import Home from "./components/Home/Home";
import Callback from "./components/Home/Callback/Callback";
import userManagerService from "./components/Shared/UserManagerService";
import { User, UserManager, UserManagerSettingsStore } from "oidc-client-ts";
import { useContext, useEffect, useRef, useState } from "react";
import Header from "./components/Header/Header";

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { DarkMode } from '@mui/icons-material';
import { StyledEngineProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const App = () => {
    const userManagerConfig = {
        authority: process.env.REACT_APP_IDENTITY_SERVER_URI as string,
        client_id: process.env.REACT_APP_IDENTITY_CLIENT_ID as string,
        redirect_uri: process.env.REACT_APP_IDENTITY_REDIRECT_URI_CALLBACK as string,
        post_logout_redirect_uri: process.env.REACT_APP_IDENTITY_REDIRECT_URI as string,
        response_type: process.env.REACT_APP_IDENTITY_RESPONSE_TYPE as string,
        scope: 'openid profile'
    }

    const darkTheme = createTheme({
        palette: {
            mode: "dark",
        }
    });

    const userManager = new UserManager(userManagerConfig);
    const [user, setUser] = useState<boolean>(localStorage.getItem("user") ? true : false);

    return (
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={darkTheme}>
                <CssBaseline />
                <Router>
                    <Header />
                    <Routes >
                        <Route path='/callback' element={<Callback userManager={userManager} user={user} setUser={setUser} />} />
                        <Route path='/' element={<Home userManager={userManager} user={user} setUser={setUser} />} />
                    </Routes >
                </Router>
            </ThemeProvider>
        </StyledEngineProvider>
    );
}

export default App;
