import { connect } from 'react-redux';
import _get from 'lodash.get';
import Orders from '../../components/orders/Orders';
import * as orderActions from '../../store/actions/orders';

const mapStateToProps = state => ({
  orders: _get(state, 'orders.monthlyOrders', {}),
  ordersTableConfig: _get(state, 'orders.ordersTableConfig', {}),
  ordersSummaryTableConfig: _get(state, 'orders.ordersSummaryTableConfig', {}),
  title: '30-Days Orders',
  cardInfo: _get(state, 'refData.cardInfo', new Map())
});

const mapDispatchToProps = dispatch => ({
  fetchOrdersData: (fromDate) => dispatch(orderActions.fetchMonthlyOrdersData(fromDate)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Orders);