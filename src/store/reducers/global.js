import { SET_NOTIFICATION, CLEAR_NOTIFICATION } from '../actions/global';

const initialState = {
    notificationMessage: null,
    notificationType: null,
};

const global = (state = initialState, action) => {
    switch (action.type) {
        case SET_NOTIFICATION:
            return { ...state, notificationMessage: action.payload.notificationMessage,
                     notificationType: action.payload.notificationType
            };

        case CLEAR_NOTIFICATION:
            return { ...state, notificationMessage: null, notificationType: null };

        default: return state;
    }
};

export default global;
