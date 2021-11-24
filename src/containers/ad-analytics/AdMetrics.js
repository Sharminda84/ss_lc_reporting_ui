import { connect } from 'react-redux';
import _get from 'lodash.get';
import AdMetrics from '../../components/ad-analytics/AdMetrics';

const mapStateToProps = state => ({
    adMetrics: _get(state, 'adAnalytics.adMetrics', []),
});

export default connect(mapStateToProps)(AdMetrics);
