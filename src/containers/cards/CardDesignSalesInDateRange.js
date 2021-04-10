import { connect } from 'react-redux';
import _get from 'lodash.get';
import CardDesignSalesInDateRange from '../../components/cards/CardDesignSalesInDateRange';
import * as orderActions from '../../store/actions/orders';

const mapStateToProps = state => ({
  cardDesignSalesInDateRange: _get(state, 'orders.cardDesignSalesInDateRange', []),
  cardDesignSalesInDateRangeTableConfig: _get(state, 'orders.cardDesignSalesInDateRangeTableConfig', []),
});

const mapDispatchToProps = dispatch => ({
  fetchCardDesignsSalesInDateRange: (fromDate, toDate) => dispatch(orderActions.fetchCardDesignsSalesInDateRange(fromDate, toDate)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CardDesignSalesInDateRange);