import { connect } from 'react-redux';
import _get from 'lodash.get';
import MemberCardsStream from '../../components/members/MemberCardsStream';
import * as memberActions from '../../store/actions/members';

const mapStateToProps = state => ({
  currentDate: _get(state, 'members.currentDate'),
  memberCards: _get(state, 'members.memberCards', new Map()),
  cardInfo: _get(state, 'refData.cardInfo', new Map()),
});

const mapDispatchToProps = dispatch => ({
  fetchCardsForMembers: (date) => dispatch(memberActions.fetchCardsForMembers(date)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MemberCardsStream);