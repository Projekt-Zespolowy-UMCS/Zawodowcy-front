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
    const mgr = useRef<UserManager>(new UserManager({authority: "", client_id: "", redirect_uri: ""}));

    useEffect(() => {
        if (userManagerService !== undefined) {
            mgr.current = userManagerService.getUserManager();
        }
    })

    return (
        <BrowserRouter>
            <Routes >
                <Route path='/callback' element={<Callback userManager={mgr.current} />} />
                <Route path='/' element={<Home userManager={mgr.current}/>} />
            </Routes >
        </BrowserRouter>
    );
}

export default App;
