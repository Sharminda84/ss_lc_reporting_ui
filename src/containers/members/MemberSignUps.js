import { connect } from 'react-redux';
import _get from 'lodash.get';
import MemberSignUps from '../../components/members/MemberSignUps';
import * as memberActions from '../../store/actions/members';

const mapStateToProps = state => ({
  memberSignUps: _get(state, 'members.memberSignups', {}),
});

const mapDispatchToProps = dispatch => ({
  fetchMembersData: () => dispatch(memberActions.fetchMembersData()),
});

export default connect(mapStateToProps, mapDispatchToProps)(MemberSignUps);