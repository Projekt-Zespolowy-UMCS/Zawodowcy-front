import React from "react";
import axios from "axios";

const COUNTRY_LIST_URL = "https://localhost:7234/api/Countries/all";

const defaultConfig = {
    headers: {
        'Accept': '*/*',
        'Content-Type': 'application/json'
    }
}

class CountriesService {
    getCountryList(){
        return axios
            .get(COUNTRY_LIST_URL, defaultConfig)
            .then(response => {
                return response.data
            })
    }
}

export default new CountriesService();
/*
{countries.map((country: any, index: any) => {
                            return <option value={country.name} key={country.iso + index}>{country.name}</option>
                        })} */