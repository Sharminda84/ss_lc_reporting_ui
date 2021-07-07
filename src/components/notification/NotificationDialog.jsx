import React from 'react';
import '../../App.css';
import './NotificationDialog.css';
import warningIcon from '../../icons/warning.svg';
import * as globalConstants from '../../store/actions/global';

function NotificationDialog(props) {
    const { notificationType, notificationMessage } = props;
    const { clearNotification } = props;

    const onOKButtonClick = () => {
        clearNotification();
    };

    return (
        notificationMessage != null && notificationMessage !== "" &&
        <div className='DialogBackground'>
            <div className='NotificationDialog'>
                <div className='NotificationDialogToolBar' />
                {
                    notificationType === globalConstants.WARNING_NOTIFICATION &&
                    <div>
                        <img src={warningIcon} width={60} height={60} />
                    </div>
                }
                <h3 className='NotificationDialogMessage'>
                    {notificationMessage}
                </h3>
                {
                    notificationType === globalConstants.WARNING_NOTIFICATION &&
                    <button className='NotificationDialogButton' onClick={onOKButtonClick}>OK</button>
                }
            </div>
        </div>
    );
};

export default NotificationDialog;
