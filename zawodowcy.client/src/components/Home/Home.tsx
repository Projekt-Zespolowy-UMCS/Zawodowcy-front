import React, {FC} from 'react';
import {UserManager} from "oidc-client-ts";


interface UserProps {
    userManager: UserManager;
    user: any;
    setUser: any;
}

const Home:FC<UserProps> = (props) => {
    return (
        <div>
            {props.user ? (
                <>
                    <h3>Welcome {props.user?.user?.profile?.sub}</h3>
                    <pre>{JSON.stringify(props.user?.data, null, 2)}</pre>
                    <p>{process.env.REACT_APP_IDENTITY_SERVER_URI as string}</p>
                    <button onClick={ () => {
                        console.log(props.userManager);
                        props.userManager.signoutRedirect();
                        localStorage.removeItem("user");
                        props.setUser(false);
                    }}>
                        Log out
                    </button>
                </>
            ) : (
                <>
                    <h3>React Weather App</h3>
                    <p>{process.env.REACT_APP_IDENTITY_SERVER_URI}</p>
                    <button onClick={() => {
                        console.log(props.userManager);
                        console.log(process.env.REACT_APP_IDENTITY_SERVER_URI as string);
                        //console.log(props.userManager.authority)
                        props.userManager.signinRedirect()
                    }}>Login</button>
                </>
            )}
        </div>
    );
};
/*
Home.propTypes = {
    userManager: UserManager
}
*/
export default Home;
