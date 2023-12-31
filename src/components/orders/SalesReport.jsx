import React, { useState } from 'react';
import '../../App.css';
import './Orders.css';
import Chart from '../chart/Chart';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown'

export const round = num => Math.round((num + Number.EPSILON) * 100) / 100;

const CARD_TYPES = ["All", "Leaving Card", "Christmas Card", "Birthday Card", "Maternity Leave Card", "New Baby Card",
    "New Daddy Card", "Welcome Card", "Retirement Card", "Get Well Soon Card", "Congratulations Card", "Good Luck Card",
    "Thank You", "Thank You Teacher", "Thinking of You", "Sympathy"];

const generateChartDataForMovingAverages = (salesReport, cardType) => {
    const chartData = [];
    if (cardType === "All") {
        for (const [key, value] of Object.entries(salesReport.thirtyDayMovingAverages)) {
            chartData.push([new Date(key).getTime(), round(value)]);
        }
        return chartData;
    }

    for (const [key, value] of Object.entries(salesReport.thirtyDayMovingAveragesPerCardType[cardType])) {
        chartData.push([new Date(key).getTime(), round(value)]);
    }
    return chartData;
};

const generateChartDataWeekdays = (amountsForWeekday, amountsPerCardTypeForWeekday, cardType) => {
    const chartData = [];
    if (cardType === "All") {
        for (const [key, value] of Object.entries(amountsForWeekday)) {
            chartData.push([new Date(key).getTime(), round(value)]);
        }
        return chartData;
    }

    for (const [key, value] of Object.entries(amountsPerCardTypeForWeekday[cardType])) {
        chartData.push([new Date(key).getTime(), round(value)]);
    }
    return chartData;
};

function SalesReport(props) {
    const { salesReport } = props;
    const [ cardType, setCardType ] = useState("All");

    const downloadDailyMovingAverages = () => {
        let csv = 'Date, Sales (£)';
        for (const [key, value] of Object.entries(salesReport.thirtyDayMovingAverages)) {
            csv = csv + '\r\n' + key + ',' + value;
        }
        const link = document.createElement('a');
        link.setAttribute('href', 'data:text/csv;charset=utf-8,' + csv);
        link.setAttribute('download', '30-day-daily-moving-average.csv');
        link.click();
    };

    const downloadSalesForWeekdays = () => {
        let csv = 'Day, Card Type, Date, Sales (£)';

        for (const [date, sales] of Object.entries(salesReport.amountsForMondays)) {
            csv = csv + '\r\n' + 'Monday' + ',' + 'All' + ',' + date + ',' + sales;
        }
        for (const [cardType, data] of Object.entries(salesReport.amountsForMondaysPerCardType)) {
            for (const [date, sales] of Object.entries(data)) {
                csv = csv + '\r\n' + 'Monday' + ',' + cardType + ',' + date + ',' + sales;
            }
        }

        for (const [date, sales] of Object.entries(salesReport.amountsForTuesdays)) {
            csv = csv + '\r\n' + 'Tuesday' + ',' + 'All' + ',' + date + ',' + sales;
        }
        for (const [cardType, data] of Object.entries(salesReport.amountsForTuesdaysPerCardType)) {
            for (const [date, sales] of Object.entries(data)) {
                csv = csv + '\r\n' + 'Tuesday' + ',' + cardType + ',' + date + ',' + sales;
            }
        }

        for (const [date, sales] of Object.entries(salesReport.amountsForWednesdays)) {
            csv = csv + '\r\n' + 'Wednesday' + ',' + 'All' + ',' + date + ',' + sales;
        }
        for (const [cardType, data] of Object.entries(salesReport.amountsForWednesdaysPerCardType)) {
            for (const [date, sales] of Object.entries(data)) {
                csv = csv + '\r\n' + 'Wedneday' + ',' + cardType + ',' + date + ',' + sales;
            }
        }

        for (const [date, sales] of Object.entries(salesReport.amountsForThursdays)) {
            csv = csv + '\r\n' + 'Thursday' + ',' + 'All' + ',' + date + ',' + sales;
        }
        for (const [cardType, data] of Object.entries(salesReport.amountsForThursdaysPerCardType)) {
            for (const [date, sales] of Object.entries(data)) {
                csv = csv + '\r\n' + 'Thursday' + ',' + cardType + ',' + date + ',' + sales;
            }
        }

        for (const [date, sales] of Object.entries(salesReport.amountsForFridays)) {
            csv = csv + '\r\n' + 'Friday' + ',' + 'All' + ',' + date + ',' + sales;
        }
        for (const [cardType, data] of Object.entries(salesReport.amountsForFridaysPerCardType)) {
            for (const [date, sales] of Object.entries(data)) {
                csv = csv + '\r\n' + 'Friday' + ',' + cardType + ',' + date + ',' + sales;
            }
        }

        for (const [date, sales] of Object.entries(salesReport.amountsForSaturdays)) {
            csv = csv + '\r\n' + 'Saturday' + ',' + 'All' + ',' + date + ',' + sales;
        }
        for (const [cardType, data] of Object.entries(salesReport.amountsForSaturdaysPerCardType)) {
            for (const [date, sales] of Object.entries(data)) {
                csv = csv + '\r\n' + 'Saturday' + ',' + cardType + ',' + date + ',' + sales;
            }
        }

        for (const [date, sales] of Object.entries(salesReport.amountsForSundays)) {
            csv = csv + '\r\n' + 'Sunday' + ',' + 'All' + ',' + date + ',' + sales;
        }
        for (const [cardType, data] of Object.entries(salesReport.amountsForSundaysPerCardType)) {
            for (const [date, sales] of Object.entries(data)) {
                csv = csv + '\r\n' + 'Sunday' + ',' + cardType + ',' + date + ',' + sales;
            }
        }

        const link = document.createElement('a');
        link.setAttribute('href', 'data:text/csv;charset=utf-8,' + csv);
        link.setAttribute('download', 'sales-by-day.csv');
        link.click();

    }

    return (
        <div>
            {
                salesReport != null &&
                <div className='charts'>
                    <div className='chartDropDown'>
                        <DropdownButton title='Card Type' onSelect={(type) => setCardType(type)}>
                            {
                                [...CARD_TYPES].map(type => <Dropdown.Item key={`key-${type}`} eventKey={`${type}`}>{type}</Dropdown.Item>)
                            }
                        </DropdownButton>
                        <button className='downloadButton' onClick={downloadDailyMovingAverages}>
                            Download Daily Moving Averages
                        </button>
                        <button className='downloadButton' onClick={downloadSalesForWeekdays}>
                            Download Sales for Weekdays
                        </button>
                    </div>
                    <Chart
                        chartType='line'
                        title={`Daily Average (30-Day Moving) - ${cardType}`}
                        subTitle='Click and drag in the plot area to zoom in'
                        xAxisType='datetime'
                        yAxisLabel='Orders (£)'
                        chartData={generateChartDataForMovingAverages(salesReport, cardType)}/>
                    <Chart
                        chartType='line'
                        title={`Sales for Mondays - ${cardType}`}
                        subTitle='Click and drag in the plot area to zoom in'
                        xAxisType='datetime'
                        yAxisLabel='Orders (£)'
                        chartData={generateChartDataWeekdays(salesReport.amountsForMondays, salesReport.amountsForMondaysPerCardType, cardType)}/>
                    <Chart
                        chartType='line'
                        title={`Sales for Tuesdays - ${cardType}`}
                        subTitle='Click and drag in the plot area to zoom in'
                        xAxisType='datetime'
                        yAxisLabel='Orders (£)'
                        chartData={generateChartDataWeekdays(salesReport.amountsForTuesdays, salesReport.amountsForTuesdaysPerCardType, cardType)}/>
                    <Chart
                        chartType='line'
                        title={`Sales for Wednesdays - ${cardType}`}
                        subTitle='Click and drag in the plot area to zoom in'
                        xAxisType='datetime'
                        yAxisLabel='Orders (£)'
                        chartData={generateChartDataWeekdays(salesReport.amountsForWednesdays, salesReport.amountsForWednesdaysPerCardType, cardType)}/>
                    <Chart
                        chartType='line'
                        title={`Sales for Thursdays - ${cardType}`}
                        subTitle='Click and drag in the plot area to zoom in'
                        xAxisType='datetime'
                        yAxisLabel='Orders (£)'
                        chartData={generateChartDataWeekdays(salesReport.amountsForThursdays, salesReport.amountsForThursdaysPerCardType, cardType)}/>
                    <Chart
                        chartType='line'
                        title={`Sales for Fridays - ${cardType}`}
                        subTitle='Click and drag in the plot area to zoom in'
                        xAxisType='datetime'
                        yAxisLabel='Orders (£)'
                        chartData={generateChartDataWeekdays(salesReport.amountsForFridays, salesReport.amountsForFridaysPerCardType, cardType)}/>
                    <Chart
                        chartType='line'
                        title={`Sales for Saturdays - ${cardType}`}
                        subTitle='Click and drag in the plot area to zoom in'
                        xAxisType='datetime'
                        yAxisLabel='Orders (£)'
                        chartData={generateChartDataWeekdays(salesReport.amountsForSaturdays, salesReport.amountsForSaturdaysPerCardType, cardType)}/>
                    <Chart
                        chartType='line'
                        title={`Sales for Sundays - ${cardType}`}
                        subTitle='Click and drag in the plot area to zoom in'
                        xAxisType='datetime'
                        yAxisLabel='Orders (£)'
                        chartData={generateChartDataWeekdays(salesReport.amountsForSundays, salesReport.amountsForSundaysPerCardType, cardType)}/>
                </div>
            }
        </div>
    );
};

export default SalesReport;
