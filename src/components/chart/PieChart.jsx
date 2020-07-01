import React from 'react';

import HighCharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import drilldown from "highcharts/modules/drilldown.js";

drilldown(HighCharts);

const getChartOptions = (title, subTitle, series, drilldown) => {
    return {
        chart: {
          type: 'pie'
        },
        title: {
            text: title
        },
        subtitle: {
            text: document.ontouchstart === undefined ? subTitle : 'Pinch the chart to zoom in'
        },
        accessibility: {
            announceNewData: {
                enabled: true
            },
            point: {
                valuePrefix: '£'
            }
        },
        plotOptions: {
            series: {
                dataLabels: {
                    enabled: true,
                    format: '{point.name}: £{point.y:.1f}'
                }
            }
        },
        tooltip: {
            headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
            pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>£{point.y:.2f}</b>'
        },
        series,
        drilldown
    }
};

function Chart(props) {
    const { title, subTitle, series, drilldown } = props;
    const chartOptions = getChartOptions(title, subTitle, series, drilldown);

    return (
        <div className='highcharts-figure'>
            <HighchartsReact highcharts={HighCharts} options={chartOptions} />
        </div>
    );
}

export default Chart;