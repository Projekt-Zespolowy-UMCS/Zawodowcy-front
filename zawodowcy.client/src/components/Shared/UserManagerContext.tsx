import React, { FC, createContext, useState, useEffect } from "react";
import { UserManager } from "oidc-client-ts";
import AuthService from "../../services/AuthService"


interface IUserManagerContext {
    userManager: UserManager;
}

const userManagerConfig = {
    authority: process.env.REACT_APP_IDENTITY_SERVER_URI as string,
    client_id: process.env.REACT_APP_IDENTITY_CLIENT_ID as string,
    redirect_uri: process.env.REACT_APP_IDENTITY_REDIRECT_URI_CALLBACK as string,
    post_logout_redirect_uri: process.env.REACT_APP_IDENTITY_POST_LOGOUT_REDIRECT_URI as string,
    response_type: process.env.REACT_APP_IDENTITY_RESPONSE_TYPE as string,
    scope: 'openid profile'
}

interface IAuthService {
    authService?: AuthService;
}


export const AuthServiceContext = createContext<IAuthService>({
    authService: undefined
});

export const AuthServiceContextProvider: FC = ({ children }) => {

    const userManager = new UserManager(userManagerConfig);
    

    // the state below is used to force the rerender of page 
    const [loginState, setLoginState] = useState<number>(0);

    const authService = new AuthService(setLoginState, loginState);

    return (
        <AuthServiceContext.Provider value={{ authService }}>
            {children}
        </AuthServiceContext.Provider>
    );
}

