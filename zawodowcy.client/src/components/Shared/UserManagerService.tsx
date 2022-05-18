import {User, UserManager} from "oidc-client-ts";
import {createContext, useState} from "react";
import {create} from "domain";

export interface IUserManagerService {
    getUserManager(scopes?: string[]): UserManager;
}

export const UserManagerServiceContext = createContext<IUserManagerService | undefined>(undefined);

const UserManagerService = (): any => {
    const [user, setUser] = useState(null);

    const userManagerService = {
        getUserManager(scopes: string[] = ['openid', 'profile', 'offline_access']) {
            return new UserManager({
                authority: process.env.REACT_APP_IDENTITY_SERVER_URI as string,
                client_id: process.env.REACT_APP_IDENTITY_CLIENT_ID as string,
                redirect_uri: process.env.REACT_APP_IDENTITY_REDIRECT_URI_CALLBACK as string,
                post_logout_redirect_uri: process.env.REACT_APP_IDENTITY_REDIRECT_URI as string,
                response_type: process.env.REACT_APP_IDENTITY_RESPONSE_TYPE as string,
                scope: getScopes(scopes)
            });
        },
    }

    const getBasicScopes = (): string[] => {
        return ['openid', 'profile', 'offline_access'];
    }

    const getScopes = (scopes: string[]): string => {
        return scopes.join(' ');
    }

    return (
        <>
            <UserManagerServiceContext.Provider value={userManagerService}>
            </UserManagerServiceContext.Provider>
        </>
    )
};

export default UserManagerService;
