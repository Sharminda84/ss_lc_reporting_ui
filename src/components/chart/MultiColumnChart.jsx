import React from 'react';

import HighCharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const getChartOptions = (title, yAxisLabel, chartData) => {
    return {
        chart: {
            type: 'column',
        },
        title: {
            text: title,
        },
        yAxis: {
            title: {
                text: yAxisLabel
            }
        },
        xAxis: {
            type: 'category',
        },
        series: chartData,
    }
};

function Chart(props) {
    const { title, yAxisLabel, chartData } = props;
    const chartOptions = getChartOptions(title, yAxisLabel, chartData);

    return (
        <div className='highcharts-figure'>
            <HighchartsReact highcharts={HighCharts} options={chartOptions} />
        </div>
    );
}

export default Chart;