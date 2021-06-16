import React, {useEffect, useState} from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../../App.css';
import './Orders.css';
import '../members/MemberSignUps.css';
import Chart from "../chart/Chart";

function FunnelAnalysis(props) {
    const { salesFunnels, fetchSalesFunnels } = props;
    const [fromDate, setFromDate] = useState(new Date().getTime());
    const [toDate, setToDate] = useState(new Date().getTime());

    const generateChartDataForCardType = (cardType) => {
        // const salesFunnelsForCardType = salesFunnels.get(cardType);
        const chartData = [];
        chartData.push([new Date().getTime(), 10, 11, 12]);
        chartData.push([new Date().getTime(), 20, 21, 22]);
        chartData.push([new Date().getTime(), 30, 31, 32]);
        return chartData;
    };

    return (
        <div>
            <h3>
                Date Range for Funnel Analysis
            </h3>
            <div className='MemberSignUpDateSection'>
                <div>From</div>
                <DatePicker
                    selected={fromDate}
                    onChange={(newFromDate) => setFromDate(newFromDate.getTime())} />
                <div>To</div>
                <DatePicker
                    selected={toDate}
                    onChange={(newToDate) => setToDate(newToDate.getTime())} />
                <button onClick={() => fetchSalesFunnels(fromDate, toDate)}>Fetch</button>
            </div>
            <div className='charts'>
                <Chart
                    chartType='column'
                    title='Leaving Card Funnel'
                    xAxisType='datetime'
                    yAxisLabel='Members Created/Cards Created/Sales'
                    chartData={generateChartDataForCardType("Leaving Cards")} />
            </div>
        </div>
    );
}

export default FunnelAnalysis;