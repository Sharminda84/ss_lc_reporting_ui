import { connect } from 'react-redux';
import _get from 'lodash.get';
import MemberCardsStream from '../../components/members/MemberCardsStream';
import * as memberActions from '../../store/actions/members';

const mapStateToProps = state => ({
  memberCards: _get(state, 'members.memberCards'),
  cardInfo: _get(state, 'refData.cardInfo', new Map()),
});

const mapDispatchToProps = dispatch => ({
  fetchCardsForMembers: () => dispatch(memberActions.fetchCardsForMembers()),
});

export default connect(mapStateToProps, mapDispatchToProps)(MemberCardsStream);