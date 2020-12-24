import { connect } from 'react-redux';
import _get from 'lodash.get';
import Navigation from '../../components/navigation/Navigation';
import * as navigationActions from '../../store/actions/navigation';

const mapStateToProps = state => ({
  initialState: _get(state, 'navigation.initialState', true),
  navigationItems: _get(state, 'navigation.navigationItems', {}),
  userRoles: _get(state, 'security.userRoles', []),
});

const mapDispatchToProps = dispatch => ({
  navigationItemClicked: (navigationItem) => dispatch(navigationActions.navigationItemClicked(navigationItem)),

});

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);