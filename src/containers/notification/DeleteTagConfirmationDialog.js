import { connect } from 'react-redux';
import _get from 'lodash.get';
import * as cardActions from '../../store/actions/cardTags';
import * as globalActions from '../../store/actions/global';
import ConfirmationDialog from '../../components/notification/ConfirmationDialog';

const mapStateToProps = state => ({
    confirmationMessage: _get(state, 'global.confirmationMessage'),
});

const mapDispatchToProps = dispatch => ({
    proceedAction: () => dispatch(cardActions.deleteTag()) && dispatch(globalActions.clearConfirmationMessage()),
    doNotProceedAction: () => dispatch(globalActions.clearConfirmationMessage()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmationDialog);
