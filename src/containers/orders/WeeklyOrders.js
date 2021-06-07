import { connect } from 'react-redux';
import _get from 'lodash.get';
import Orders from '../../components/orders/Orders';
import * as orderActions from '../../store/actions/orders';

const mapStateToProps = state => ({
  orders: _get(state, 'orders.weeklyOrders', {}),
  adCampaignsData: _get(state, 'orders.weeklyAdCampaignsData', {}),
  campaignToCardTypeMappings: _get(state, 'orders.campaignToCardTypeMappings'),
  ordersTableConfig: _get(state, 'orders.ordersTableConfig', {}),
  statsTableConfig: _get(state, 'orders.statsTableConfig', {}),
  ordersSummaryTableConfig: _get(state, 'orders.ordersSummaryTableConfig', {}),
  title: 'Weekly Orders',
  cardInfo: _get(state, 'refData.cardInfo', new Map()),
  showWeeklyOrdersChart: false,
  cardDesignCounts: _get(state, 'refData.cardDesignCounts'),
});

const mapDispatchToProps = dispatch => ({
  fetchOrdersData: (fromDate) => dispatch(orderActions.fetchWeeklyOrdersData(fromDate)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Orders);