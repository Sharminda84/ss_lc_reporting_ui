export const SET_NOTIFICATION = 'global/SET_NOTIFICATION';
export const CLEAR_NOTIFICATION = 'global/CLEAR_NOTIFICATION';
export const WARNING_NOTIFICATION = 'Warning';
export const SET_CONFIRMATION = 'global/SET_CONFIRMATION';
export const CLEAR_CONFIRMATION = 'global/CLEAR_CONFIRMATION';

export const setNotification = (notificationType, notificationMessage) => ({
    type: SET_NOTIFICATION,
    payload: {
        notificationType: notificationType,
        notificationMessage: notificationMessage,
    }
});

export const clearNotification = () => ({
    type: CLEAR_NOTIFICATION,
    payload: {}
});

export const setConfirmationMessage = (message) => ({
    type: SET_CONFIRMATION,
    payload: {
        message
    }
});

export const clearConfirmationMessage = () => ({
    type: CLEAR_CONFIRMATION,
    payload: {}
});
