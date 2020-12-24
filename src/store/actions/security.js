export const TRIGGER_LOGIN = 'security/TRIGGER_LOGIN';
export const LOGIN_USER = 'security/LOGIN_USER';
export const LOGIN_ERROR = 'security/LOGIN_ERROR';
export const LOGOUT_USER = 'security/LOGOUT_USER';

export const triggerLogin = (user, password) => ({
    type: TRIGGER_LOGIN,
    payload: {
        user,
        password
    }
});

export const loginSuccess = (jwt, userRoles) => ({
    type: LOGIN_USER,
    payload: {
        jwt,
        userRoles
    }
});

export const loginError = () => ({
    type: LOGIN_ERROR,
    payload: {
    }
});

export const logout = () => ({
    type: LOGOUT_USER,
    payload: {}
});