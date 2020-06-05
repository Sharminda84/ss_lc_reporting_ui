import React, { useEffect } from 'react';
import '../../App.css';
import HighCharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import './Revenue.css';

function Revenue(props) {
    const { fetchRevenueData, revenueData } = props;

    useEffect(() => {
        fetchRevenueData()
    }, [fetchRevenueData]);

    const options = {
        chart: {
            zoomType: 'x'
        },
        title: {
            text: 'Revenue over time'
        },
        subtitle: {
            text: document.ontouchstart === undefined ?
                'Click and drag in the plot area to zoom in' : 'Pinch the chart to zoom in'
        },
        xAxis: {
            type: 'datetime'
        },
        yAxis: {
            title: {
                text: 'Revenue'
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
            type: 'area',
            name: 'Revenue',
            data: revenueData
        }]
    };

    return (
        <div className='AppMainSection'>
           <div className='highcharts-figure'>
               <HighchartsReact
                   highcharts={HighCharts}
                   options={options} />
           </div>
        </div>
    );
}

export default Revenue;