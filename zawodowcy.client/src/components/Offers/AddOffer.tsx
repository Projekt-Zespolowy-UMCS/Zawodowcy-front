import React, { FC, useEffect, useState, useContext, ChangeEvent } from "react";
import { Grid, Paper, Typography, TextField, Button, Select, MenuItem, NativeSelect, Box, Container } from "@mui/material";
import CountryService from "../../services/CountriesService";
import { Link } from "react-router-dom"
import { ColorModeContext } from "../ThemeMode/ThemeContext";
import RegisterService from "../../services/RegisterService";
import { AuthServiceContext } from '../Shared/UserManagerContext';
import { useNavigate } from "react-router-dom";

interface IOfferData {
    title: string,
    content: string,
    category: string,
    location: string
}

export const AddOffer: FC = () => {

    const initialOfferState = {
        title: "",
        content: "",
        category: "",
        location: ""
    }

    const [formValues, setFormValues] = useState<IOfferData>(initialOfferState)
    const [formErrors, setFormErrors] = useState<IOfferData>(initialOfferState);
    const [submitted, setSubmitted] = useState<boolean>(false);
    const [signUpWasSuccessful, setSignUpWasSuccessful] = useState<boolean>(false);
    const { authService } = useContext(AuthServiceContext);
    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormValues({ ...formValues, [name]: value });
    };
    const navigate = useNavigate();
    
    /*
    useEffect(
        () => {
            if (authService?.isAuthenticated()) {
                navigate("/")
            }
        }
    )
    

    const register = (event: ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        const currentFormErrors = validate(formValues);
        setFormErrors(currentFormErrors);
        console.log(currentFormErrors);
        console.log(Object.values(currentFormErrors).every(x => !x));
        if (!Object.values(currentFormErrors).every(x => !x)) return;
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
    
    const validate = (values: IOfferData): IOfferData => {
        const errors: IOfferData = initialOfferState;
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
    */
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
                        <Button variant="contained" fullWidth onClick={() => { alert("added") }}>
                            Log in
                        </Button>
                    </Box> :

                    <Box component="form" onSubmit={() => alert("aaaa")} sx={{ mt: 3 }}>
                        <Typography component="h1" variant="h5">
                            Create your offer here
                        </Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="given-name"
                                    name="title"
                                    required
                                    fullWidth
                                    id="title"
                                    label="Title"
                                    value={formValues.title}
                                    onChange={handleInputChange}
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="content"
                                    label="Content"
                                    name="content"
                                    multiline
                                    rows={4}
                                    autoComplete="family-name"
                                    value={formValues.content}
                                    onChange={handleInputChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="category"
                                    label="Category"
                                    name="Category"
                                    autoComplete="category"
                                    value={formValues.category}
                                    onChange={handleInputChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name=""
                                    label="Location"
                                    type="location"
                                    id="location"
                                    autoComplete="location"
                                    value={formValues.location}
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
                }

            </Box>
        </Container>
    );

}

export default AddOffer;