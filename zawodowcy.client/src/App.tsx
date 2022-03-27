import './App.scss';
import {BrowserRouter, Routes, Route} from "react-router-dom"
import UserManagerService, {UserManagerServiceContext} from "./components/Shared/UserManagerService";
import Home from "./components/Home/Home";
import Callback from "./components/Home/Callback/Callback";
import userManagerService from "./components/Shared/UserManagerService";
import {UserManager, UserManagerSettingsStore} from "oidc-client-ts";
import {useContext, useEffect, useRef} from "react";

const App = () => {


    const userManagerService = useContext(UserManagerServiceContext);
    /*const mgr = useRef<UserManager>(new UserManager({authority: "", client_id: "", redirect_uri: ""}));

    useEffect(() => {
        if (userManagerService !== undefined) {
            mgr.current = userManagerService.getUserManager();
        }
    })
    */
    const userManagerConfig = {
        authority: process.env.REACT_APP_IDENTITY_SERVER_URI as string,
        client_id: process.env.REACT_APP_IDENTITY_CLIENT_ID as string,
        redirect_uri: process.env.REACT_APP_IDENTITY_REDIRECT_URI_CALLBACK as string,
        post_logout_redirect_uri: process.env.REACT_APP_IDENTITY_REDIRECT_URI as string,
        response_type: process.env.REACT_APP_IDENTITY_RESPONSE_TYPE as string,
        scope: 'openid profile'
    }

    const userManager = new UserManager(userManagerConfig);
    
    return (
        <BrowserRouter>
            <Routes >
                <Route path='/callback' element={<Callback userManager={userManager} />} />
                <Route path='/' element={<Home userManager={userManager}/>} />
            </Routes >
        </BrowserRouter>
    );
}

export default App;
