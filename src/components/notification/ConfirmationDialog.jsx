import React from 'react';
import '../../App.css';
import './ConfirmationDialog.css';
import warningIcon from '../../icons/warning.svg';

function ConfimrationDialog(props) {
    const { confirmationMessage } = props;
    const { proceedAction, doNotProceedAction } = props;

    return (
        confirmationMessage != null && confirmationMessage !== "" &&
        <div className='DialogBackground'>
            <div className='ConfirmationDialog'>
                <div className='ConfirmationDialogToolBar' />
                {
                    <div>
                        <img src={warningIcon} width={60} height={60} />
                    </div>
                }
                <h3 className='ConfirmationDialogMessage'>
                    {confirmationMessage}
                </h3>
                <div className='ConfirmationDialogButtonsPanel'>
                    <button className='ConfirmationDialogButton ConfirmationDialogLeftButton' onClick={proceedAction}>Yes</button>
                    <button className='ConfirmationDialogButton ConfirmationDialogRightButton' onClick={doNotProceedAction}>No</button>
                </div>
            </div>
        </div>
    );
};

export default ConfimrationDialog;
