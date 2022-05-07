import React, { FC, createContext } from "react";
import {UserManager} from "oidc-client-ts";


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

export const UserManagerContext = createContext<UserManager | undefined>(undefined);

export const UserManagerContextProvider: FC = ({children}) => {

    const userManager =  new UserManager(userManagerConfig);

    return(
        <UserManagerContext.Provider value={userManager}>
            {children}
        </UserManagerContext.Provider>
    );
}

