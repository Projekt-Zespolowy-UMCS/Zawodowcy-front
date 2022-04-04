import React, {FC, useEffect, useState} from 'react';
import {User, UserManager} from "oidc-client-ts";


interface UserProps {
    userManager: UserManager;
    user: any;
    setUser: any;
}

const Home:FC<UserProps> = (props) => {
    const [state, setState] = useState<User | null>();

    
	useEffect(() => {
		// mgr.getUser().then((user) => {
		// 	if (user) {
		// 		var api = new WeatherAPI("https://localhost:5002");
		// 		api.getWeatherForecast(user.access_token).then((data) =>
		// 			setState({ user, data })
		// 		);
		// 	}
		// });
		props.userManager.getUser().then((user) => {
			setState(user);
		});
	}, []);

    console.log(state);
    return (
        <div>
            {props.user ? (
                <>
                    <h3>Welcome {props.user?.user?.profile?.sub}</h3>
                    <pre>{JSON.stringify(props.user?.data, null, 2)}</pre>
                    <p>{process.env.REACT_APP_IDENTITY_SERVER_URI as string}</p>
                    <button onClick={ () => {
                        console.log(props.userManager);
                        props.userManager.signoutRedirect({id_token_hint: state?.id_token});
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
                        props.userManager.signinRedirect();
                        props.userManager.removeUser();
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
