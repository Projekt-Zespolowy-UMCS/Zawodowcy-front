import axios from "axios";

const BASE_URL = process.env.REACT_APP_IDENTITY_SERVER_URI
const API_URL = `${BASE_URL}/api/Auth/`;

const defaultConfig = {
    headers: {
        'Accept': '*/*',
        'Content-Type': 'application/json',
        'withCredentials': true
    }
}

interface IRegisterData {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    secondPassword: string;
    phoneNumber: string;
}

class RegisterService {
   
    register(data: IRegisterData) {
        console.log(API_URL);
        return axios
            .post(API_URL + "register",
                data, defaultConfig)
            .then(response => {
                return response.data
            })
    }
}

export default new RegisterService();
