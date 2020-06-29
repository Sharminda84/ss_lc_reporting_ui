import { connect } from 'react-redux';
import _get from 'lodash.get';
import Orders from '../../components/orders/Orders';
import * as orderActions from '../../store/actions/orders';

const mapStateToProps = state => ({
  orders: _get(state, 'orders.orders', {}),
  ordersTableConfig: _get(state, 'orders.ordersTableConfig', {}),
  ordersSummaryTableConfig: _get(state, 'orders.ordersSummaryTableConfig', {}),
  title: 'Orders'
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchOrdersData: () => dispatch(orderActions.fetchOrdersData(ownProps.startDate, ownProps.endDate)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Orders);