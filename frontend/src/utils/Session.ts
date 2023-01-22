let session: Session = null;

class Session {
    private static AUTH_TOKEN_KEY = "authToken";
    private static instance: Session = null;

    protected constructor() {}

    public static getInstance(): Session {
        if (!Session.instance) {
            Session.instance = new Session();
        }
        return Session.instance;
    }

    public getAuthToken() {
        const authTokenFromStorage = localStorage.getItem(Session.AUTH_TOKEN_KEY);
        if (!authTokenFromStorage) {
            return null;
        }
        return authTokenFromStorage;
    }

    public setAuthToken(authToken: any) {
        return localStorage.setItem(Session.AUTH_TOKEN_KEY, authToken);
    }

    public eraseAuthToken() {
        localStorage.removeItem(Session.AUTH_TOKEN_KEY);
    }
}

export {Session};
