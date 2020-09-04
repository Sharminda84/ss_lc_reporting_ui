import React from 'react';

import HighCharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const getChartOptions = (title, type, chartData) => {
    return {
        chart: {
            type: 'column',
        },
        title: {
            text: title,
        },
        xAxis: {
            type: 'datetime',
        },
        series: chartData,
    }
};

function Chart(props) {
    const { title, type, chartData } = props;
    const chartOptions = getChartOptions(title, type, chartData);

    return (
        <div className='highcharts-figure'>
            <HighchartsReact highcharts={HighCharts} options={chartOptions} />
        </div>
    );
}

export default Chart;