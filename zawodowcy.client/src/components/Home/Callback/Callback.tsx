import {useEffect, useState, FC} from "react";
import {State, User, UserManager} from "oidc-client-ts";

interface UserProps {
    userManager: UserManager;
    user: boolean;
    setUser: any;
}

const Callback:FC<UserProps> = (props) => {
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

    return (
        <div>
            <p>Loading user data...</p>
            <p>Your access token: {localStorage.getItem("user")}</p>
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
