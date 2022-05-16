import React, { FC, useEffect, useState, useContext, ChangeEvent } from "react";
import { Grid, Paper, Typography, TextField, Button, Select, MenuItem, NativeSelect, Box, Container } from "@mui/material";
import CountryService from "../../services/CountriesService";
import { Link } from "react-router-dom"
import { ColorModeContext } from "../ThemeMode/ThemeContext";
import RegisterService from "../../services/RegisterService";
import { AuthServiceContext } from '../Shared/UserManagerContext';
import { useNavigate } from "react-router-dom";

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
    const [formErrors, setFormErrors] = useState<IRegisterData>(initialRegisterState);
    const [submitted, setSubmitted] = useState<boolean>(false);
    const [signUpWasSuccessful, setSignUpWasSuccessful] = useState<boolean>(false);
    const { authService } = useContext(AuthServiceContext);
    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormValues({ ...formValues, [name]: value });
    };
    const navigate = useNavigate();

    useEffect(
        () => {
            if (authService?.isAuthenticated()) {
                navigate("/")
            }
        }
    )


    const register = (event: ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        setFormErrors(validate(formValues));
        setSubmitted(true);
        if (Object.values(formErrors).every(x => !x)) return;
        var data = {
            firstName: formValues.firstName,
            lastName: formValues.lastName,
            email: formValues.email,
            password: formValues.password,
            secondPassword: formValues.secondPassword,
            phoneNumber: formValues.phoneNumber,
        }
        console.log(JSON.stringify(data));
        RegisterService.register(data).then(response => { setSignUpWasSuccessful(true) }).catch(error => console.log(error));
    }

    const validate = (values: IRegisterData): IRegisterData => {
        const errors: IRegisterData = initialRegisterState;
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
        const phoneRegex = /^[0-9]{6,14}$/;

        if (!regex.test(values.email)) {
            errors.email = "This is not a valid email format!";
        }
        if (!passwordRegex.test(values.password)) {
            errors.password = "The password needs to be atleast 6 characters long and must contain atleast one each of the following: Upper character, Lower character, number and non alphanumeric character"
        }
        if (values.password !== values.secondPassword) {
            errors.secondPassword = "Passwords are not the same"
        }
        if (!phoneRegex.test(values.phoneNumber)) {
            errors.phoneNumber = "This is not valid phone number"
        }
        return errors;
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
                {signUpWasSuccessful ?
                    <Box sx={{ mt: 3 }}>
                        <Typography component="h1" variant="h5">
                            Your registration was successful
                        </Typography>
                        <Button variant="contained" fullWidth onClick={() => { authService?.login() }}>
                            Log in
                        </Button>
                    </Box> :

                    <Box component="form" onSubmit={register} sx={{ mt: 3 }}>
                        <Typography component="h1" variant="h5">
                            Register here
                        </Typography>
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
                                    {...(formErrors.email && { error: true, helperText: formErrors.email })}
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
                                    {...(formErrors.password && { error: true, helperText: formErrors.password })}
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
                                    {...(formErrors.secondPassword && { error: true, helperText: formErrors.secondPassword })}
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
                                    {...(formErrors.phoneNumber && { error: true, helperText: formErrors.phoneNumber })}
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
                }

            </Box>
        </Container>
    );

}

export default Register;