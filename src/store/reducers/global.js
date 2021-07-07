import {
    SET_NOTIFICATION, CLEAR_NOTIFICATION,
    SET_CONFIRMATION, CLEAR_CONFIRMATION
} from '../actions/global';

const initialState = {
    notificationMessage: null,
    notificationType: null,
    confirmationMessage: null,
};

const global = (state = initialState, action) => {
    switch (action.type) {
        case SET_NOTIFICATION:
            return { ...state, notificationMessage: action.payload.notificationMessage,
                               notificationType: action.payload.notificationType
            };

        case CLEAR_NOTIFICATION:
            return { ...state, notificationMessage: null, notificationType: null };

        case SET_CONFIRMATION:
            return { ...state, confirmationMessage: action.payload.message };

        case CLEAR_CONFIRMATION:
            return { ...state, confirmationMessage: null };

        default: return state;
    }
};

export default global;
