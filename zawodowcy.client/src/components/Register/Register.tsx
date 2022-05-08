import React, { FC, useEffect, useState } from "react";
import { Grid, Paper, Typography, TextField, Button, Select, MenuItem, NativeSelect } from "@mui/material";
import CountryService from "../../services/CountriesService";

export const Register: FC = () => {
    const [countries, setCountries] = useState<any>(null);
    const [selectedCountry, setSelectedCountry] = useState<any>("Any");

    const updateCountriesList = (): void => {
        if (countries) return;
        CountryService.getCountryList()
            .then(response => {
                console.log(response);
                setCountries(response);
                
            }).catch(error => {
                const resMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();
                console.log(resMessage);
            })
    }

    useEffect(() => {
        updateCountriesList()
    }, []);

    const handleChange = (event: any): void => {
        setSelectedCountry(event.target.value);
    }

    const paperStyle = { padding: '30px 20px', width: 300, margin: "20px auto" }
    const headerStyle = { margin: 0, align: 'center' }
    return (
        <Grid container>
            <Paper elevation={20} style={paperStyle}>
                <Grid container justifyContent="center">
                    <h2 style={headerStyle}> Register here </h2>
                    <Typography variant='caption' gutterBottom>Please fill this form to create an account!</Typography>
                </Grid>
                <form>
                    <TextField fullWidth margin="normal" label="Email" placeholder="Enter your email" />
                    <TextField fullWidth margin="normal" label="First Name" placeholder="Enter your First Name" />
                    <TextField fullWidth margin="normal" label="Last Name" placeholder="Enter your Last" />
                    <TextField fullWidth margin="normal" label="Phone number" placeholder="Enter your phone number" />
                    <Typography variant='caption' gutterBottom>Address</Typography>
                    <TextField fullWidth margin="normal" label="Street" placeholder="Enter your Street name" />
                    <TextField fullWidth margin="normal" label="City" placeholder="Enter your city" />
                    <TextField fullWidth margin="normal" label="Zip Code" placeholder="Enter your Zip Code" />
                   {countries && <NativeSelect
                        sx={{margingTop: 5, marginBottom: 3}}
                        value={selectedCountry}
                        onChange={handleChange}
                        
                        defaultValue={""}
                    >
                    {countries.map((country:any, index:any) =>{
                        return <option value={country.name} key={country.iso + index}>{country.name}</option>
                    })}
                    </NativeSelect> }
                  
                    <Button variant='contained' color='primary' onClick={() => { console.log(countries) }}>Sign up</Button>
                </form>
            </Paper>
        </Grid>
    );

}

export default Register;