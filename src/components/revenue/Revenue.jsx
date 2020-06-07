import React, { useEffect } from 'react';
import '../../App.css';
import Chart from '../chart/Chart';
import './Revenue.css';

function Revenue(props) {
    const { fetchRevenueData, revenueData } = props;

    useEffect(() => {
        fetchRevenueData()
    }, [fetchRevenueData]);

    return (
        <div className='AppMainSection'>
            <Chart
                chartType='area'
                title='Revenue over time'
                subTitle='Click and drag in the plot area to zoom in'
                xAxisType='datetime'
                yAxisLabel='Revenue'
                chartData={revenueData} />
        </div>
    );
}

export default Revenue;