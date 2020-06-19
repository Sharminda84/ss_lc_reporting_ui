import { connect } from 'react-redux';
import _get from 'lodash.get';
import Login from '../../components/security/Login';
import * as securityActions from '../../store/actions/security';

const mapStateToProps = state => ({
  loggedIn: _get(state, 'security.loggedIn', false),
  logInError: _get(state, 'security.logInError', false),
});

const mapDispatchToProps = dispatch => ({
  triggerLogin: (user, password) => dispatch(securityActions.triggerLogin(user, password)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);