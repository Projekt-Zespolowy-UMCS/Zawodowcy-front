import { State, User, UserManager } from "oidc-client-ts";

const userManagerConfig = {
    authority: process.env.REACT_APP_IDENTITY_SERVER_URI as string,
    client_id: process.env.REACT_APP_IDENTITY_CLIENT_ID as string,
    redirect_uri: process.env.REACT_APP_IDENTITY_REDIRECT_URI_CALLBACK as string,
    post_logout_redirect_uri: process.env.REACT_APP_IDENTITY_POST_LOGOUT_REDIRECT_URI as string,
    response_type: process.env.REACT_APP_IDENTITY_RESPONSE_TYPE as string,
    scope: 'openid profile'
}

export class AuthService {

    userManager: UserManager;
    setState: (state: number) => void;
    state: number;

    constructor(setState: (state: number) => void, state: number) {
        this.userManager = new UserManager(userManagerConfig);
        this.setState = setState;
        this.state = state;
    }

    getUserOrLogin = (): User | void => {
        this.userManager.getUser()
            .then(user => {
                if (user) return user;
                this.login();
            })
    }

    private getUserStorage = () => {
        const sessionItemName = "oidc.user:" + process.env.REACT_APP_IDENTITY_SERVER_URI + ":" + process.env.REACT_APP_IDENTITY_CLIENT_ID
        const userStorage = JSON.parse(sessionStorage.getItem(sessionItemName) || "{}");
        
        return userStorage;
    }

    isAuthenticated = ():boolean => {
        const userStorage = this.getUserStorage(); 

        return (!!userStorage && !!userStorage.access_token);

    }

    login = () => {
        this.userManager.signinPopup()
            .then(() => {this.setState(this.state + 1)}); // state is used to rerender page after popup login
    }

    logout = async () => {
        const userStorage = this.getUserStorage(); 
      //  const id_token: string = user ? user.id_token as string : "";
        const id_token = userStorage.id_token || "";
        this.userManager.signoutRedirect({ id_token_hint: id_token, post_logout_redirect_uri: "http://localhost:3000" });
    }
}

export default AuthService;