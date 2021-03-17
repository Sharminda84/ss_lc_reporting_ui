import { connect } from 'react-redux';
import _get from 'lodash.get';
import DailyOrders from '../../components/orders/DailyOrders';
import * as orderActions from '../../store/actions/orders';

const mapStateToProps = state => ({
  dailyOrders: _get(state, 'orders.dailyOrders', {}),
  dailyAdCampaignsData: _get(state, 'orders.dailyAdCampaignsData', {}),
  campaignToCardTypeMappings: _get(state, 'state.campaignToCardTypeMappings'),
  ordersTableConfig: _get(state, 'orders.ordersTableConfig', {}),
  ordersSummaryTableConfig: _get(state, 'orders.ordersSummaryTableConfig', {}),
});

const mapDispatchToProps = dispatch => ({
  fetchOrdersData: (date) => dispatch(orderActions.fetchDailyOrdersData(date)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DailyOrders);