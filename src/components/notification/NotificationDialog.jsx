import React from 'react';
import '../../App.css';
import './NotificationDialog.css';
import closeIcon from '../../icons/close.jpg';
import warningIcon from '../../icons/warning.svg';
import * as globalConstants from '../../store/actions/global';
import { useHistory } from 'react-router-dom';

function NotificationDialog(props) {
    const { notificationType, notificationMessage } = props;
    const { clearNotification } = props;

    const history = useHistory();

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
