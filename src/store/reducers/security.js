import { LOGIN_ERROR, LOGIN_USER, LOGOUT_USER } from '../actions/security';

const initialState = {
  loggedIn: false,
  logInError: false,
  jwt: null,
  userRoles: [],
};

const security = ( state = initialState, action ) => {
    switch ( action.type ) {
        case LOGIN_USER:
            return { ...state, loggedIn: true, jwt: action.payload.jwt, userRoles: action.payload.userRoles };
        case LOGOUT_USER:
            return { ...state, loggedIn: false };
        case LOGIN_ERROR:
            return { ...state, logInError: true };
        default: return state;
    }
};

export default security;
