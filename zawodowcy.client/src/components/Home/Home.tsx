import React, { FC, useContext, useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { User, UserManager } from "oidc-client-ts";
import { AuthServiceContext } from '../Shared/UserManagerContext';
import { Container, Box, Typography, Button, Grid } from '@mui/material';
import AuthorizedHomeComponent from "./AuthorizedHomeComponent";
import UnauthorizedHomeComponent from "./UnauthorizedHomeComponent";


interface UserProps {
    userManager: UserManager;
    user: any;
    setUser: any;
}

const Home: FC<UserProps> = (props) => {
    const { authService } = useContext(AuthServiceContext);

    return (
        <Container component="main" maxWidth="md">
            <Box sx={{
                marginTop: 10,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}>
                <Typography component="h1" variant="h4" sx={{ fontWeight: "bold", textAlign: "center" }}>
                    Welcome to Zawodowcy.pl
                </Typography>
                {authService?.isAuthenticated() ?
                    <AuthorizedHomeComponent /> : <UnauthorizedHomeComponent />
                }
            </Box>
        </Container>
        /*
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
        */
    );
};

export default Home;
