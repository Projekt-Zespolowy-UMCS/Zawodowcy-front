import {useEffect, useState} from "react";
import {User, UserManager} from "oidc-client-ts";

const Callback = ({userManager}: any) => {
    useEffect(() => {
        userManager.signinRedirectCallback().then((user: User) => {
            if (user) {
                userManager.setUser(user);
            }
        });
    }, [userManager]);

    return (
        <div>
            <p>Loading user data...</p>
        </div>
    );
};

Callback.propTypes = {
    userManager: UserManager
};

export default Callback;
