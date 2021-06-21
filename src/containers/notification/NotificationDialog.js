import { connect } from 'react-redux';
import _get from 'lodash.get';
import * as globalActions from '../../store/actions/global';
import NotificationDialog from '../../components/notification/NotificationDialog';

const mapStateToProps = state => ({
    notificationMessage: _get(state, 'global.notificationMessage'),
    notificationType: _get(state, 'global.notificationType'),
});

const mapDispatchToProps = dispatch => ({
    clearNotification: () => dispatch(globalActions.clearNotification()),
});

export default connect(mapStateToProps, mapDispatchToProps)(NotificationDialog);
