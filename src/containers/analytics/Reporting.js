import { connect } from 'react-redux';
import _get from 'lodash.get';
import Reporting from '../../components/analytics/Reporting';

const mapStateToProps = state => ({
    reports: _get(state, 'reports.configuredReports', {}),
});

export default connect(mapStateToProps)(Reporting);
