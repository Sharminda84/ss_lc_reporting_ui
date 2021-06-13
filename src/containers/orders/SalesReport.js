import { connect } from 'react-redux';
import _get from 'lodash.get';
import SalesReport from '../../components/orders/SalesReport';

const mapStateToProps = state => ({
  salesReport: _get(state, 'orders.salesReport'),
});

export default connect(mapStateToProps)(SalesReport);