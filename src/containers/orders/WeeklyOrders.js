import { connect } from 'react-redux';
import _get from 'lodash.get';
import Orders from '../../components/orders/Orders';
import * as orderActions from '../../store/actions/orders';

const mapStateToProps = state => ({
  orders: _get(state, 'orders.weeklyOrders', {}),
  ordersTableConfig: _get(state, 'orders.ordersTableConfig', {}),
  ordersSummaryTableConfig: _get(state, 'orders.ordersSummaryTableConfig', {}),
  title: 'Weekly Orders',
  cardInfo: _get(state, 'refData.cardInfo', new Map()),
  showWeeklyOrdersChart: false
});

const mapDispatchToProps = dispatch => ({
  fetchOrdersData: () => dispatch(orderActions.fetchWeeklyOrdersData()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Orders);