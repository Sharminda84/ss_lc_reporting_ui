import { connect } from 'react-redux';
import _get from 'lodash.get';
import Revenue from '../../components/revenue/Revenue';
import * as revenueActions from '../../store/actions/revenue';

const mapStateToProps = state => ({
  revenueData: _get(state, 'revenue.revenueData', {}),
});

const mapDispatchToProps = dispatch => ({
  fetchRevenueData: () => dispatch(revenueActions.fetchRevenueData()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Revenue);