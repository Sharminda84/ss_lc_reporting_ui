import { connect } from 'react-redux';
import _get from 'lodash.get';
import AdMetrics from '../../components/ad-analytics/AdMetrics';

const mapStateToProps = state => ({
    // reports: _get(state, 'reports.configuredReports', {}),
});

export default connect(mapStateToProps)(AdMetrics);
