import React, { FC, useEffect, useState } from "react";
import { Grid, Paper, Typography, TextField, Button, Select, MenuItem, NativeSelect } from "@mui/material";
import CountryService from "../../services/CountriesService";
import { styled } from '@mui/material/styles';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

export const Test: FC = () => {

    const paperStyle = { padding: '30px 20px', width: 300, margin: "20px auto" }
    const headerStyle = { margin: 0, align: 'center' }
    return (
        <Grid
            container
            item
            spacing={2}
            alignItems="center"
            sx={{height: "100vh"}}
            >
            <Paper sx={{
                textAlign: "center",
                padding: '30px 20px', width: 300, margin: "20px auto" 
            }}
                component={Grid}
                container
                item
                spacing={2}
                elevation={15}
                xs={4}
            >
                <Grid item xs={6}>
                    <TextField fullWidth margin="normal" label="Email" placeholder="Enter your email" />
                </Grid>
                <Grid item xs={6}>
                    <TextField  fullWidth margin="normal" label="Email" placeholder="Enter your email" />
                </Grid>
                <Grid item xs={4}>
                    <Item>xs=4</Item>
                </Grid>
                <Grid item xs={8}>
                    <Item>xs=8</Item>
                </Grid>
            </Paper>
        </Grid>
    );

}

export default Test;