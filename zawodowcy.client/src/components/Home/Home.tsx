import React, {FC, useContext, useEffect, useState} from 'react';
import {User, UserManager} from "oidc-client-ts";
import { UserManagerContext } from '../Shared/UserManagerContext';

interface UserProps {
    userManager: UserManager;
    user: any;
    setUser: any;
}

const Home:FC<UserProps> = (props) => {
    const [state, setState] = useState<User | null>();
    const userManager = useContext(UserManagerContext);
    
	useEffect(() => {
        console.log(userManager?.getUser())
        console.log("XDDDDDDDDDDD");
		userManager?.getUser().then((user) => {
			setState(user);
		});
	}, [userManager]);



    console.log(state);
    return (
        <div>
            {state ? (
                <>
                    <h3>Welcome {props.user?.user?.profile?.sub}</h3>
                    <pre>{JSON.stringify(props.user?.data, null, 2)}</pre>
                    <p>{process.env.REACT_APP_IDENTITY_SERVER_URI as string}</p>
                    <button onClick={ () => {
                        console.log(props.userManager);
                        userManager?.signoutRedirect({id_token_hint: state?.id_token, post_logout_redirect_uri: "http://localhost:3000"});
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
                        userManager?.signinRedirect();
                        userManager?.removeUser();
                    }}>Login</button>
                    <button onClick={() => console.log(userManager)}> XD </button>
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
