import logo from './logo.svg';
import './App.css';
import {UserManager} from "oidc-client-ts";
import {BrowserRouter, Routes, Route} from "react-router-dom"
import {useEffect, useState} from "react";

function App() {
    // const userManagerConfig = {
    //     authority: 'https://localhost:7234',
    //     client_id: 'spa',
    //     redirect_uri: '"http://localhost:3000/callback',
    //     post_logout_redirect_uri: 'http://localhost:3000/',
    //     response_type: 'code',
    //     usePKCE: true,
    //     scope: 'openid profile',
    //     loadUserInfo: true,
    //     monitorSession: false
    // }
    return (
        <BrowserRouter>
            <Routes >
                <Route path='/callback' element={<Callback/>} />
                <Route path='/' element={<HomePage/>} />
            </Routes >
        </BrowserRouter>
    );
}

var mgr = new UserManager({
    authority: "https://localhost:7234",
    client_id: "spa",
    redirect_uri: "http://localhost:3000/callback",
    post_logout_redirect_uri: "http://localhost:3000/",
    response_type: "code",
    scope: "openid profile offline_access",
});

function HomePage() {
    const [state, setState] = useState(null);
    const logUser = () => {
        console.log(state)
    }

    useEffect(() => {
        // mgr.getUser().then((user) => {
        // 	if (user) {
        // 		var api = new WeatherAPI("https://localhost:5002");
        // 		api.getWeatherForecast(user.access_token).then((data) =>
        // 			setState({ user, data })
        // 		);
        // 	}
        // });
        mgr.getUser().then((user) => {
            if (user) {
                setState({ user });
            }
        });
    }, [mgr]);

    return (
        <div>
            {state ? (
                <>
                    <h3>Welcome {state?.user?.profile?.sub}</h3>
                    <pre>{JSON.stringify(state?.data, null, 2)}</pre>
                    <button onClick={logUser}>get user</button>
                    <button onClick={() => mgr.signoutRedirect()}>
                        Log out
                    </button>
                </>
            ) : (
                <>
                    <h3>React Weather App</h3>
                    <button onClick={() => mgr.signinRedirect()}>Login</button>
                </>
            )}
        </div>
    );
}


function Callback() {
    useEffect(() => {

        mgr.signinRedirectCallback()
            .then(user => {
            console.log(user);
            window.location.href = 'http://localhost:3000';
        })
            .catch(error => {
                console.error(error);
            });
    }, []);

    return <p>Loading...</p>;
}

export default App;
