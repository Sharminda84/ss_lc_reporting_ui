import React, {useEffect, useState} from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../../App.css';
import './Orders.css';
import '../members/MemberSignUps.css';
import MultiColumnChart from '../chart/MultiColumnChart';

function FunnelAnalysis(props) {
    const { salesFunnels, fetchSalesFunnels } = props;
    const [fromDate, setFromDate] = useState(new Date().getTime());
    const [toDate, setToDate] = useState(new Date().getTime());

    const generateChartDataForCardType = (cardType) => {
        // const salesFunnelsForCardType = salesFunnels.get(cardType);
        const chartData = [
            {
                name: 'Members Created',
                data: [
                    ['Monday', 3],
                    ['Tuesday', 3],
                    ['Wednesday', 3],
                    ['Thursday', 3],
                    ['Friday', 3],
                    ['Saturday', 3],
                    ['Sunday', 3]
                ]
            },
            {
                name: 'Cards Created',
                data: [
                    ['Monday', 3],
                    ['Tuesday', 3],
                    ['Wednesday', 3],
                    ['Thursday', 3],
                    ['Friday', 3],
                    ['Saturday', 3],
                    ['Sunday', 3]
                ]
            },
            {
                name: 'Cards Sold',
                data: [
                    ['Monday', 3],
                    ['Tuesday', 3],
                    ['Wednesday', 3],
                    ['Thursday', 3],
                    ['Friday', 3],
                    ['Saturday', 3],
                    ['Sunday', 3]
                ]
            },
        ];

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
                <MultiColumnChart
                    title='Leaving Card Funnel'
                    chartData={generateChartDataForCardType("Leaving Cards")} />
                <MultiColumnChart
                    title='Birthday Card Funnel'
                    chartData={generateChartDataForCardType("Birthday Cards")} />

            </div>
        </div>
    );
}

export default FunnelAnalysis;