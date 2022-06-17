import React, { FC, useEffect, useState, useContext, ChangeEvent } from "react";
import { Grid, Paper, Typography, TextField, Button, Select, MenuItem, NativeSelect, Box, Container } from "@mui/material";
import CountryService from "../../services/CountriesService";
import { Link } from "react-router-dom"
import { ColorModeContext } from "../ThemeMode/ThemeContext";
import RegisterService from "../../services/RegisterService";
import { AuthServiceContext } from '../Shared/UserManagerContext';
import { useNavigate } from "react-router-dom";

type IOffers{
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

    return (
        <>Dupa</>
    );

}

export default OffersList;