import { connect } from 'react-redux';
import _get from 'lodash.get';
import Navigation from '../components/navigation/Navigation';

const mapStateToProps = state => ({
  memberNavigation: _get(state, 'navigation.memberNavigation', {}),
  ordersNavigation: _get(state, 'navigation.ordersNavigation', {}),
});

const mapDispatchToProps = dispatch => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);