import React, { FC, useContext, useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { User, UserManager } from "oidc-client-ts";
import { AuthServiceContext } from '../Shared/UserManagerContext';
import { Container, Box, Typography, Button, Grid } from '@mui/material';


export const UnauthorizedHomeComponent: FC = () => {
    const { authService } = useContext(AuthServiceContext);

    return (
        <Box sx={{ mt: 3 }}>
            <Typography component="p">You are not Logged in. Login or register below.</Typography>
            <Box sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                        <Button variant="contained" fullWidth onClick={() => { authService?.login() }}>
                            Log in
                        </Button>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Link to="/register" style={{ textDecoration: 'none' }}>
                            <Button variant="contained" fullWidth>
                                Register
                            </Button>
                        </Link>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
}

export default UnauthorizedHomeComponent;