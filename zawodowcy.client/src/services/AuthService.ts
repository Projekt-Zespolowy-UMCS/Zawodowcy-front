import { User, UserManager } from "oidc-client-ts";

export class AuthService {

    getUserOrLogin = (userManager: UserManager): User | void => {
        userManager.getUser()
            .then(user => {
                if (user) return user;
                localStorage.setItem("preRedirectUrl", window.location.href)
                userManager.signinRedirect();
            })
    }

    isUserLogged = (userManager: UserManager): boolean => {
        userManager.getUser()
            .then(user => { return user ? true : false })
        return false;
    }

    login = (userManager: UserManager) => {
        userManager.signinRedirect();
    }

    logout = async (userManager: UserManager) => {
        const user = await userManager.getUser();
        const id_token: string = user ? user.id_token as string : "";
        userManager.signoutRedirect({ id_token_hint: id_token, post_logout_redirect_uri: "http://localhost:3000" });
    }
}

export default new AuthService();