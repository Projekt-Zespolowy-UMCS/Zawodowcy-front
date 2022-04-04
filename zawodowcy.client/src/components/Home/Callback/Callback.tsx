import {useEffect, useState, FC} from "react";
import {State, User, UserManager} from "oidc-client-ts";
import { useNavigate } from "react-router-dom";

interface UserProps {
    userManager: UserManager;
    user: boolean;
    setUser: any;
}

const Callback:FC<UserProps> = (props) => {
    /*
    useEffect(() => {
        props.userManager.signinRedirectCallback().then((user: User) => {
            console.log("XDDDDD")
            console.log(user)
            window.history.replaceState({},
                window.document.title,
                window.location.origin + window.location.pathname);
            if (user) {
                console.log("działa")
                localStorage.setItem("user", user.access_token);
                
            }
        });
    });
*/
    const navigate = useNavigate();

    const onSuccessCallback = (user: User) => {
        localStorage.setItem("user", user.access_token);
        localStorage.setItem("id_token", user.id_token || '');
        console.log(user);
        navigate('/');
    }

    const onErrorCallback = (error: Error) => {
        console.log(error);
        navigate('/');
    }

    useEffect(() => {
        props.userManager
        .signinRedirectCallback()
        .then(user => onSuccessCallback(user))
        .catch(error => onErrorCallback(error));
    });

    return (
        <div>
            <p>Loading user data...</p>
            <p>Your access token: {localStorage.getItem("user") ?  <>ZALOGOWANO</> :<> nie ZALOGOWANO </>}</p>
        </div>
    );
};
/*
Callback.propTypes = {
    userManager: UserManager,
    user: State,
};
*/
export default Callback;
