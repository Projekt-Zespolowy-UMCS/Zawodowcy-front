import logo from './logo.svg';
import './App.css';
import { createUserManager } from 'redux-oidc';

function App() {
    const userManagerConfig = {
        authority: 'https://localhost:7234',
        client_id: 'spa',
        redirect_uri: 'http://localhost:3000/',
        post_logout_redirect_uri: 'http://localhost:3000/',
        response_type: 'code',
        scope: 'openid profile',
        loadUserInfo: true,
        monitorSession: false
    }

    const test = () => {
        signIn();
    }

    const userr = () => {
        userManager.getUser().then((user) => {
            console.log('THEN');
            console.log(user)
        }).catch(error => {
            console.log('ERROR');
            console.log(error);
        })
    }


    function signIn() {
        return userManager.signinRedirect();
    }
    const userManager = createUserManager(userManagerConfig)





    return ( <
        div className = "App" >
        <
        button onClick = { test } > login wtf < /button> <
        button onClick = { userr } > getuser < /button> <
        /div >
    );
}

export default App;