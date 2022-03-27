import React from 'react';
import {UserManager} from "oidc-client-ts";

const Home = ({userManager}: any) => {
    return (
        <div>
            {userManager.user ? (
                <>
                    <h3>Welcome {userManager.user?.user?.profile?.sub}</h3>
                    <pre>{JSON.stringify(userManager.user?.data, null, 2)}</pre>
                    <p>{process.env.REACT_APP_IDENTITY_SERVER_URI as string}</p>
                    <button onClick={ () => {
                        console.log(userManager);
                        userManager.signoutRedirect();
                    }}>
                        Log out
                    </button>
                </>
            ) : (
                <>
                    <h3>React Weather App</h3>
                    <p>{process.env.REACT_APP_IDENTITY_SERVER_URI}</p>
                    <button onClick={() => {
                        console.log(userManager);
                        console.log(process.env.REACT_APP_IDENTITY_SERVER_URI as string);
                        console.log(userManager.authority)
                        userManager.signinRedirect()
                    }}>Login</button>
                </>
            )}
        </div>
    );
};

Home.propTypes = {
    userManager: UserManager
}

export default Home;
