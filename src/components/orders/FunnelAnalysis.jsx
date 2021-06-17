import React, {useEffect, useState} from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../../App.css';
import './Orders.css';
import '../members/MemberSignUps.css';
import MultiColumnChart from '../chart/MultiColumnChart';

const DAYS_OF_WEEK = new Map();
DAYS_OF_WEEK.set(1, 'Monday');
DAYS_OF_WEEK.set(2, 'Tuesday');
DAYS_OF_WEEK.set(3, 'Wednesday');
DAYS_OF_WEEK.set(4, 'Thursday');
DAYS_OF_WEEK.set(5, 'Friday');
DAYS_OF_WEEK.set(6, 'Saturday');
DAYS_OF_WEEK.set(7, 'Sunday');

function FunnelAnalysis(props) {
    const { salesFunnels, fetchSalesFunnels } = props;
    const [fromDate, setFromDate] = useState(new Date().getTime());
    const [toDate, setToDate] = useState(new Date().getTime());

    const generateChartDataForCardType = (cardType) => {
        const salesFunnelsForCardType = salesFunnels.get(cardType);

        if (salesFunnelsForCardType == null || salesFunnelsForCardType.length == 0) {
            return [];
        }

        const membersCreatedMap = new Map();
        membersCreatedMap.set('Monday', 0);
        membersCreatedMap.set('Tuesday', 0);
        membersCreatedMap.set('Wednesday', 0);
        membersCreatedMap.set('Thursday', 0);
        membersCreatedMap.set('Friday', 0);
        membersCreatedMap.set('Saturday', 0);
        membersCreatedMap.set('Sunday', 0);

        const cardsCreatedMap = new Map();
        cardsCreatedMap.set('Monday', 0);
        cardsCreatedMap.set('Tuesday', 0);
        cardsCreatedMap.set('Wednesday', 0);
        cardsCreatedMap.set('Thursday', 0);
        cardsCreatedMap.set('Friday', 0);
        cardsCreatedMap.set('Saturday', 0);
        cardsCreatedMap.set('Sunday', 0);

        const salesMap = new Map();
        salesMap.set('Monday', 0);
        salesMap.set('Tuesday', 0);
        salesMap.set('Wednesday', 0);
        salesMap.set('Thursday', 0);
        salesMap.set('Friday', 0);
        salesMap.set('Saturday', 0);
        salesMap.set('Sunday', 0);

        salesFunnelsForCardType.forEach(salesFunnel => {
            const memberCreateUpdateTime = new Date(salesFunnel.memberCreateUpdateTime);
            let day = DAYS_OF_WEEK.get(memberCreateUpdateTime.getDay());
            membersCreatedMap.set(day, membersCreatedMap.get(day) + 1);

            const cardCreationTime = new Date(salesFunnel.cardCreationTime);
            day = DAYS_OF_WEEK.get(cardCreationTime.getDay());
            cardsCreatedMap.set(day, cardsCreatedMap.get(day) + 1);

            const transactionTime = new Date(salesFunnel.transactionTime);
            day = DAYS_OF_WEEK.get(transactionTime.getDay());
            salesMap.set(day, salesMap.get(day) + 1);
        });

        const chartData = [
            {
                name: 'Members Created',
                data: [
                    ['Monday', membersCreatedMap.get('Monday')],
                    ['Tuesday', membersCreatedMap.get('Tuesday')],
                    ['Wednesday', membersCreatedMap.get('Wednesday')],
                    ['Thursday', membersCreatedMap.get('Thursday')],
                    ['Friday', membersCreatedMap.get('Friday')],
                    ['Saturday', membersCreatedMap.get('Saturday')],
                    ['Sunday', membersCreatedMap.get('Sunday')]
                ]
            },
            {
                name: 'Cards Created',
                data: [
                    ['Monday', cardsCreatedMap.get('Monday')],
                    ['Tuesday', cardsCreatedMap.get('Tuesday')],
                    ['Wednesday', cardsCreatedMap.get('Wednesday')],
                    ['Thursday', cardsCreatedMap.get('Thursday')],
                    ['Friday', cardsCreatedMap.get('Friday')],
                    ['Saturday', cardsCreatedMap.get('Saturday')],
                    ['Sunday', cardsCreatedMap.get('Sunday')]
                ]
            },
            {
                name: 'Cards Sold',
                data: [
                    ['Monday', salesMap.get('Monday')],
                    ['Tuesday', salesMap.get('Tuesday')],
                    ['Wednesday', salesMap.get('Wednesday')],
                    ['Thursday', salesMap.get('Thursday')],
                    ['Friday', salesMap.get('Friday')],
                    ['Saturday', salesMap.get('Saturday')],
                    ['Sunday', salesMap.get('Sunday')]
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
                <MultiColumnChart title='Leaving Cards Funnel' chartData={generateChartDataForCardType("Leaving Card")} />
                <MultiColumnChart title='Birthday Cards Funnel' chartData={generateChartDataForCardType("Birthday Card")} />
                <MultiColumnChart title='Retirement Cards Funnel' chartData={generateChartDataForCardType("Retirement Card")} />
                <MultiColumnChart title='Maternity Leave Cards Funnel' chartData={generateChartDataForCardType("Maternity Leave Card")} />
                <MultiColumnChart title='Goodluck Cards Funnel' chartData={generateChartDataForCardType("Good Luck Card")} />
                <MultiColumnChart title='Thank You Cards Funnel' chartData={generateChartDataForCardType("Thank You")} />
                <MultiColumnChart title='New Baby Cards Funnel' chartData={generateChartDataForCardType("New Baby Card")} />
                <MultiColumnChart title='Congratulations Cards Funnel' chartData={generateChartDataForCardType("Congratulations Cards")} />
                <MultiColumnChart title='Get Well Soon Cards Funnel' chartData={generateChartDataForCardType("Get Well Soon Card")} />
                <MultiColumnChart title='New Daddy Cards Funnel' chartData={generateChartDataForCardType("New Daddy Card")} />
                <MultiColumnChart title='Sympathy Cards Funnel' chartData={generateChartDataForCardType("Sympathy")} />
                <MultiColumnChart title='Thinking of You Cards Funnel' chartData={generateChartDataForCardType("Thinking of You")} />
                <MultiColumnChart title='Welcome Cards Funnel' chartData={generateChartDataForCardType("Welcome Card")} />
                <MultiColumnChart title='Thank You Teacher Cards Funnel' chartData={generateChartDataForCardType("Thank You Teacher")} />
                <MultiColumnChart title='Christmas Cards Funnel' chartData={generateChartDataForCardType("Christmas Card")} />
            </div>
        </div>
    );
}

export default FunnelAnalysis;