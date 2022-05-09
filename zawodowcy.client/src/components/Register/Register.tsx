import React, { FC, useEffect, useState, useContext, ChangeEvent } from "react";
import { Grid, Paper, Typography, TextField, Button, Select, MenuItem, NativeSelect, Box, Container } from "@mui/material";
import CountryService from "../../services/CountriesService";
import { Link } from "react-router-dom"
import { ColorModeContext } from "../ThemeMode/ThemeContext";

interface IRegisterData {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    secondPassword: string;
    phoneNumber: string;
}

export const Register: FC = () => {

    const initialRegisterState = {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        secondPassword: "",
        phoneNumber: "",
    }

    const [formValues, setFormValues] = useState<IRegisterData>(initialRegisterState)
    const [submitted, setSubmitted] = useState<boolean>(false);
    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const register = () => {
        var data = {
            firstName: formValues.firstName,
            lastName: formValues.lastName,
            email: formValues.email,
            password: formValues.password,
            secondPassword: formValues.secondPassword,
            phoneNumber: formValues.phoneNumber,
        }
        alert(JSON.stringify(data));
    }

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 10,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}>
                <Typography component="h1" variant="h5">
                    Register here
                </Typography>
                <Box component="form" noValidate onSubmit={register} sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="given-name"
                                name="firstName"
                                required
                                fullWidth
                                id="firstName"
                                label="First Name"
                                value={formValues.firstName}
                                onChange={handleInputChange}
                                autoFocus
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                fullWidth
                                id="lastName"
                                label="Last Name"
                                name="lastName"
                                autoComplete="family-name"
                                value={formValues.lastName}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                value={formValues.email}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="new-password"
                                value={formValues.password}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                name="secondPassword"
                                label="Repeat Password"
                                type="password"
                                id="secondPassword"
                                autoComplete="new-password"
                                value={formValues.secondPassword}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="phoneNumber"
                                label="Phone Number"
                                name="phoneNumber"
                                autoComplete="phone"
                                value={formValues.phoneNumber}
                                onChange={handleInputChange}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign Up
                    </Button>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link to="/">
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );

}

export default Register;