import React from 'react';

import HighCharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const getChartOptions = (chartType, title, subTitle, xAxisType, yAxisLabel, chartData) => {
    return {
        chart: {
            zoomType: 'x'
        },
        title: {
            text: title
        },
        subtitle: {
            text: document.ontouchstart === undefined ? subTitle : 'Pinch the chart to zoom in'
        },
        xAxis: {
            type: xAxisType
        },
        yAxis: {
            title: {
                text: yAxisLabel
            }
        },
        legend: {
            enabled: false
        },
        plotOptions: {
            area: {
                fillColor: {
                    linearGradient: {
                        x1: 0,
                        y1: 0,
                        x2: 0,
                        y2: 1
                    },
                    stops: [
                        [0, HighCharts.getOptions().colors[0]],
                        [1, HighCharts.color(HighCharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                    ]
                },
                marker: {
                    radius: 2
                },
                lineWidth: 1,
                states: {
                    hover: {
                        lineWidth: 1
                    }
                },
                threshold: 0
            }
        },

        series: [{
            type: chartType,
            name: yAxisLabel,
            data: chartData
        }]
    }
};

function Chart(props) {
    const { chartType, title, subTitle, xAxisType, yAxisLabel, chartData } = props;
    const chartOptions = getChartOptions(chartType, title, subTitle, xAxisType, yAxisLabel, chartData);

    return (
        <div className='highcharts-figure'>
            <HighchartsReact highcharts={HighCharts} options={chartOptions} />
        </div>
    );
}

export default Chart;