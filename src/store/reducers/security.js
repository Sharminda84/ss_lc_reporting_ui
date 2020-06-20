import { LOGIN_ERROR, LOGIN_USER, LOGOUT_USER } from '../actions/security';

const initialState = {
  loggedIn: false,
  user: '',
  password: '',
  logInError: false,
};

const security = ( state = initialState, action ) => {
    switch ( action.type ) {
        case LOGIN_USER:
            return { ...state, loggedIn: true, user: action.payload.user, password: action.payload.password };
        case LOGOUT_USER:
            return { ...state, loggedIn: false };
        case LOGIN_ERROR:
            return { ...state, logInError: true };
        default: return state;
    }
};

export default security;