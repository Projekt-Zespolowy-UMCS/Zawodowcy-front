import React, {FC, useContext, useEffect, useState} from 'react';
import {User, UserManager} from "oidc-client-ts";
import { AuthServiceContext } from '../Shared/UserManagerContext';

interface UserProps {
    userManager: UserManager;
    user: any;
    setUser: any;
}

const Home:FC<UserProps> = (props) => {
    const {authService} = useContext(AuthServiceContext);
    
    return (
        <div>
            {authService?.isAuthenticated() ? (
                <>
                    <h3>Welcome {props.user?.user?.profile?.sub}</h3>
                    <button onClick={ () => {
                        
                        authService?.logout();
                    }}>
                        Log out
                    </button>
                </>
            ) : (
                <>
                    <h3>React Weather App</h3>
                    <p>{process.env.REACT_APP_IDENTITY_SERVER_URI}</p>
                    <button onClick={() => {
                        authService?.login();
                    }}>Login</button>
                    <button onClick={() => console.log(authService?.userManager)}> XD </button>
                </>
            )}
        </div>
    );
};

export default Home;
