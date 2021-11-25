import React from 'react';
import './AdMetrics.css';

function AdMetrics(props) {

    const { adMetrics } = props;

    const printMetric = (adMetric) => {

        return (
            <div className='AdMetric'>
                <div className='AdMetricRow HeaderRow'>
                    <div>Ad: {adMetric.adGroupId}</div>
                    <div>Account: {adMetric.accountId}</div>
                    <div>Campaign: {adMetric.campaignId}</div>
                </div>
                <div className='AdMetricRow'>
                    Conversion Ratio: {adMetric.convertedToLandedRatio}
                </div>
                <div className='AdMetricRow'>
                    Landed count: {adMetric.landedCount}
                </div>
                <div className='AdMetricRow'>
                    Total registered: {adMetric.registeredCount}
                </div>
                <div className='AdMetricRow'>
                    Total eCards Purchased: {adMetric.ecardPurchasedCount}
                </div>
                <div className='AdMetricRow'>
                    Total A4 purchased: {adMetric.a4PurchasedCount}
                </div>
                <div className='AdMetricRow'>
                    Total A5 purchased: {adMetric.a5PurchasedCount}
                </div>
                <div className='AdMetricRow'>
                    Key Words: {adMetric.keyWords.map(keyWord => "[" + keyWord + "]  ")}
                </div>
            </div>
        );

    };

    return (
        <div className='AdMetrics'>
            <div className='AdMetricsTitle'>
                Ad Metrics
            </div>
            {
                adMetrics.map(adMetric => printMetric(adMetric))
            }
        </div>
    );
}

export default AdMetrics;
