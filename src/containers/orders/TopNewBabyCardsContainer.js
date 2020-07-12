import { connect } from 'react-redux';
import _get from 'lodash.get';
import TopCards from '../../components/top-cards/TopCards';

const mapStateToProps = state => ({
  cardTypeId: '4',
  cards: _get(state, 'orders.topCards', []),
});

export default connect(mapStateToProps)(TopCards);