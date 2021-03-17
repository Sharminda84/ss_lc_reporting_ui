import { connect } from 'react-redux';
import _get from 'lodash.get';
import Orders from '../../components/orders/Orders';
import * as orderActions from '../../store/actions/orders';

const mapStateToProps = state => ({
  orders: _get(state, 'orders.todaysOrders', {}),
  adCampaignsData: _get(state, 'orders.todaysAdCampaignsData', {}),
  campaignToCardTypeMappings: _get(state, 'state.campaignToCardTypeMappings'),
  ordersTableConfig: _get(state, 'orders.ordersTableConfig', {}),
  displayChart: false,
  cardInfo: _get(state, 'refData.cardInfo', new Map()),
  showOrderDetailsTable: true,
});

const mapDispatchToProps = dispatch => ({
  fetchOrdersData: () => dispatch(orderActions.fetchTodaysOrdersData()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Orders);