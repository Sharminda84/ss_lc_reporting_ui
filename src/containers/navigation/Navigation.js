import { connect } from 'react-redux';
import _get from 'lodash.get';
import Navigation from '../../components/navigation/Navigation';

const mapStateToProps = state => ({
  navigationItems: _get(state, 'navigation.navigationItems', {}),
});

const mapDispatchToProps = dispatch => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);