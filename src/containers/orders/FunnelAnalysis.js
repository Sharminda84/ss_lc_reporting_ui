import { connect } from 'react-redux';
import _get from 'lodash.get';
import FunnelAnalysis from '../../components/orders/FunnelAnalysis';
import * as orderActions from '../../store/actions/orders';

const mapStateToProps = state => ({
  salesFunnels: _get(state, 'orders.salesFunnels'),
});

const mapDispatchToProps = dispatch => ({
  fetchSalesFunnels: (fromDate, toDate) => dispatch(orderActions.fetchSalesFunnels(fromDate, toDate)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FunnelAnalysis);