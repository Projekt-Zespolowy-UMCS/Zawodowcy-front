import React, { FC, useEffect, useState, useContext, ChangeEvent } from "react";
import { Grid, Paper, Typography, TextField, Button, Select, MenuItem, NativeSelect, Box, Container, TableContainer, Table, TableRow, TableHead, TableCell, TableBody, Avatar, ButtonGroup } from "@mui/material";
import CountryService from "../../services/CountriesService";
import { Link } from "react-router-dom"
import { ColorModeContext } from "../ThemeMode/ThemeContext";
import RegisterService from "../../services/RegisterService";
import { AuthServiceContext } from '../Shared/UserManagerContext';
import { useNavigate } from "react-router-dom";

type IOffers = {
    id: number,
    fname: string,
    lname: string,
    username: string,
    avatar: string
}

export const OffersList: FC = () => {

    const [offers, setOffers] = useState<IOffers[]>([])

    useEffect(() => {
        UsersGet()
    }, [])

    const UsersGet = () => {
        fetch("https://www.mecallapi.com/api/users")
            .then(res => res.json())
            .then(
                (result) => {
                    setOffers(result)
                }
            )
    }
    /*
    const UpdateUser = id => {
        window.location = '/update/' + id
    }

    const UserDelete = id => {
        var data = {
            'id': id
        }
        fetch('https://www.mecallapi.com/api/users/delete', {
            method: 'DELETE',
            headers: {
                Accept: 'application/form-data',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(res => res.json())
            .then(
                (result) => {
                    alert(result['message'])
                    if (result['status'] === 'ok') {
                        UsersGet();
                    }
                }
            )
    }
*/


    return (
        <Container
            //alignItems="center"
            //justifyContent="center"
            sx={{ margin: 2 }}
        >
            <Paper sx={{ color: 'primary.main', }}>
                <Box display="flex">
                    <Box flexGrow={1}>
                        <Typography component="h2" variant="h6" color="primary" gutterBottom>
                            Offers
                        </Typography>
                    </Box>
                    <Box>
                        <Link to="/offers/add">
                            <Button variant="contained" color="primary">
                                CREATE
                            </Button>
                        </Link>
                    </Box>
                </Box>
                <TableContainer component={Paper}>
                    <Table  aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="right">ID</TableCell>
                                <TableCell align="center">Avatar</TableCell>
                                <TableCell align="left">Title</TableCell>
                                <TableCell align="left">User</TableCell>
                                <TableCell align="center">Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {offers.map((offer) => (
                                <TableRow key={offer.id}>
                                    <TableCell align="right">{offer.id}</TableCell>
                                    <TableCell align="center">
                                        <Box display="flex" justifyContent="center">
                                            <Avatar src={offer.avatar} />
                                        </Box>
                                    </TableCell>
                                    <TableCell align="left">{offer.fname}</TableCell>
                                    <TableCell align="left">{offer.username}</TableCell>
                                    <TableCell align="center">
                                        <ButtonGroup color="primary" aria-label="outlined primary button group">
                                            <Button onClick={() => alert("aaa")}>Edit</Button>
                                            <Button onClick={() => alert("xd")}>Del</Button>
                                        </ButtonGroup>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

            </Paper>
        </Container>
    );

}

export default OffersList;