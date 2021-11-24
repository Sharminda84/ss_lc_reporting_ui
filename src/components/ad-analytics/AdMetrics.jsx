import React from 'react';
import './AdMetrics.css';

function AdMetrics(props) {

    const { adMetrics } = props;

    return (
        <div className=''>
            Ad Metrics Length: {adMetrics.length}
        </div>
    );
}

export default AdMetrics;
