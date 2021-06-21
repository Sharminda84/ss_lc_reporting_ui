export const SET_NOTIFICATION = 'global/SET_NOTIFICATION';
export const CLEAR_NOTIFICATION = 'global/CLEAR_NOTIFICATION';
export const WARNING_NOTIFICATION = 'Warning';

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
