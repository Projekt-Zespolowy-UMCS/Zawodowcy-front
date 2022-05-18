import React, { FC, useContext, useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { User, UserManager } from "oidc-client-ts";
import { AuthServiceContext } from '../Shared/UserManagerContext';
import { Container, Box, Typography, Button, Grid } from '@mui/material';


export const AuthorizedHomeComponent: FC = () => {
    const { authService } = useContext(AuthServiceContext);

    return (
        <Box sx={{ mt: 3 }}>
            <Typography component="p">You are Logged in</Typography>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Button variant="contained" fullWidth onClick={() => { authService?.logout() }}>
                        Logout
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
}

export default AuthorizedHomeComponent;