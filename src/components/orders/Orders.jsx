import React, { useEffect } from 'react';
import '../../App.css';
import './Orders.css';
import Chart from '../chart/Chart';
import PieChart from '../chart/PieChart';
import DataTable from '../table/DataTable';
import _ from 'lodash';
import { dateToString, getCardName } from '../../utils';

const CARD_TYPES = new Map();
CARD_TYPES.set(-1, "Unknown");
CARD_TYPES.set(0, "Leaving Card");
CARD_TYPES.set(1, "Christmas Card");
CARD_TYPES.set(2, "Birthday Card");
CARD_TYPES.set(3, "Maternity Leave Card");
CARD_TYPES.set(4, "New Baby Card");
CARD_TYPES.set(5, "New Daddy Card");
CARD_TYPES.set(6, "Welcome Card");

const round = num => Math.round((num + Number.EPSILON) * 100) / 100;

// Process orders for generating the order chart
const convertToChartData = (orders) => {
    const chartData = [];
    orders
        .reduce((allOrders, order) => {
            const transactionDate = new Date(order.transactionTime);
            const key = transactionDate.getFullYear() + '-' +
                (transactionDate.getMonth() + 1) + '-' +
                transactionDate.getDate()

            if (!allOrders.has(key)) {
                allOrders.set(key, 0);
            }

            allOrders.set(key, allOrders.get(key) + 1);
            return allOrders;
        }, new Map())
        .forEach((count, date) => chartData.push([new Date(date).getTime() + 24*60*60*1000, count]));

    return _.orderBy(chartData, data => data[0], 'asc');
}

// Process orders to generate the orders summary
// 1. Orders summary
// 2. Printed card Orders breakdown pie chart + drill-down data structure
// 3. ECard Orders breakdown pie chart + drill-down data structure (map)
const buildOrderSummariesMaps = (orders, 
                                 ordersSummary,
                                 printedCardOrderBreakdownPieChartData, printedCardOrderBreakdownPieChartDrilldownData,
                                 eCardOrderBreakdownPieChartData, eCardOrderBreakdownPieChartDrilldownData) => {
    orders.forEach(order => {
        // 1. Order summary
        const cardType = CARD_TYPES.get(order.leavingCard ? order.leavingCard.cardType : -1);
        if (!ordersSummary.has(cardType)) {
            ordersSummary.set(cardType, {
                cardType,
                eCardSales: 0,
                eCardRevenue: 0,
                printedSales: 0,
                printedRevenue: 0,
                totalSales: 0,
                totalRevenue: 0
            });
        }
        const orderSummary = ordersSummary.get(cardType);
        if (order.deliveryAddress === '') {
            orderSummary.eCardSales = orderSummary.eCardSales + 1;
            orderSummary.eCardRevenue = orderSummary.eCardRevenue + order.transactionAmount;
        } else {
            orderSummary.printedSales = orderSummary.printedSales + 1;
            orderSummary.printedRevenue = orderSummary.printedRevenue + order.transactionAmount;
        }
        orderSummary.totalSales = orderSummary.totalSales + 1;
        orderSummary.totalRevenue = orderSummary.totalRevenue + order.transactionAmount;
        ordersSummary.set(cardType, orderSummary);

        // 2. Printed cards break-down
        if (order.leavingCard && order.deliveryAddress !== '') {
            if (!printedCardOrderBreakdownPieChartData.has(cardType)) {
                printedCardOrderBreakdownPieChartData.set(cardType, {
                    name: cardType,
                    y: 0,
                    drilldown: cardType
                });
            }
            const cardTypeData = printedCardOrderBreakdownPieChartData.get(cardType);
            cardTypeData.y = cardTypeData.y + order.transactionAmount;


            if (!printedCardOrderBreakdownPieChartDrilldownData.has(cardType)) {
                printedCardOrderBreakdownPieChartDrilldownData.set(cardType, new Map());
            }
            const cardTypeMap = printedCardOrderBreakdownPieChartDrilldownData.get(cardType);
            const cardName = order.leavingCard.pdfGenerationClass;
            if (!cardTypeMap.has(cardName)) {
                cardTypeMap.set(cardName, 0);
            }
            cardTypeMap.set(cardName, cardTypeMap.get(cardName) + order.transactionAmount);
        }

        // 3. ECards break-down
        if (order.leavingCard && order.deliveryAddress === '') {
            if (!eCardOrderBreakdownPieChartData.has(cardType)) {
                eCardOrderBreakdownPieChartData.set(cardType, {
                    name: cardType,
                    y: 0,
                    drilldown: cardType
                });
            }
            const cardTypeData = eCardOrderBreakdownPieChartData.get(cardType);
            cardTypeData.y = cardTypeData.y + order.transactionAmount;


            if (!eCardOrderBreakdownPieChartDrilldownData.has(cardType)) {
                eCardOrderBreakdownPieChartDrilldownData.set(cardType, new Map());
            }
            const cardTypeMap = eCardOrderBreakdownPieChartDrilldownData.get(cardType);
            const cardName = order.leavingCard.pdfGenerationClass;
            if (!cardTypeMap.has(cardName)) {
                cardTypeMap.set(cardName, 0);
            }
            cardTypeMap.set(cardName, cardTypeMap.get(cardName) + order.transactionAmount);
        }
    });
}

const generateOrdersSummaryArray = ordersSummary => {
    const ordersSummaryArray = [];
    ordersSummary.forEach((summary, orderType) => {
        summary.eCardRevenue = `£${round(summary.eCardRevenue)}`
        summary.printedRevenue = `£${round(summary.printedRevenue)}`
        summary.totalRevenue = `£${round(summary.totalRevenue)}`
        ordersSummaryArray.push(summary);
    });
    return ordersSummaryArray;
}

const generateOrdersForTable = orders => orders.map(order => {
    const clonedOrder = _.cloneDeep(order);
    clonedOrder.transactionTime = dateToString(new Date(clonedOrder.transactionTime));
    clonedOrder.orderType = clonedOrder.deliveryAddress !== '' ? 'Physical Card' : 'E-Card';
    clonedOrder.transactionAmount = `£${clonedOrder.transactionAmount}`
    return clonedOrder;
});

const generateCardDataSeries = (name, orderBreakdownPieChartData) => {
    const printedCardsData = [];
    orderBreakdownPieChartData.forEach((cardTypeDetails, cardType) => {
        printedCardsData.push(cardTypeDetails);
    });
    const printedCardsDataSeries = [];
    printedCardsDataSeries.push({
        name,
        colorByPoint: true,
        data: printedCardsData
    });
    return printedCardsDataSeries;
}

const generateCardDrilldownDataSeries = (orderBreakdownPieChartDrilldownData, cardInfo) => {
    const printedCardsDrillDownData = [];
    orderBreakdownPieChartDrilldownData.forEach((cardTypeDetails, cardType) => {
        const cardTypeRecord = {
            name: cardType,
            id: cardType,
            data: []
        };
        cardTypeDetails.forEach((cardNameDetails, cardName) => {
            const cardNameShort = getCardName(cardName);
            let cardURL = cardInfo.get(cardNameShort).cardURL;
            cardTypeRecord.data.push({
                name: cardNameShort,
                y: cardNameDetails,
                imageSource: cardURL
            });
        });
        printedCardsDrillDownData.push(cardTypeRecord);
    });

    return {
        series: printedCardsDrillDownData
    };
}

function Orders(props) {
    const { fetchOrdersData, ordersTableConfig, ordersSummaryTableConfig, orders, displayChart = true, title, cardInfo } = props;

    useEffect(() => {fetchOrdersData()}, [fetchOrdersData]);

    const ordersSummary = new Map();
    const printedCardOrderBreakdownPieChartData = new Map();
    const printedCardOrderBreakdownPieChartDrilldownData = new Map();
    const eCardOrderBreakdownPieChartData = new Map();
    const eCardOrderBreakdownPieChartDrilldownData = new Map();
    buildOrderSummariesMaps(orders, ordersSummary, 
        printedCardOrderBreakdownPieChartData, printedCardOrderBreakdownPieChartDrilldownData, 
        eCardOrderBreakdownPieChartData, eCardOrderBreakdownPieChartDrilldownData);
    
    // Generate data structures for presentation
    const totalOrdersValue = orders.reduce((total, order) => {
        return total + order.transactionAmount;
    }, 0.0);
    const ordersSummaryArray = generateOrdersSummaryArray(ordersSummary);
    const ordersForTable = generateOrdersForTable(orders);
    const printedCardsDataSeries = generateCardDataSeries('PrintedCards', printedCardOrderBreakdownPieChartData);
    const printedCardsDrillDownDataSeries = generateCardDrilldownDataSeries(printedCardOrderBreakdownPieChartDrilldownData, cardInfo);
    const eCardsDataSeries = generateCardDataSeries('eCards', eCardOrderBreakdownPieChartData);
    const eCardsDrillDownDataSeries = generateCardDrilldownDataSeries(eCardOrderBreakdownPieChartDrilldownData, cardInfo);

    return (
        <div>
            {
                orders.length === 0 && <div>
                    No Orders...
                </div>
            }
            {
                orders.length > 0 &&
                <div className='orderTotal'>
                    Total Sales: £{round(totalOrdersValue)}
                </div>
            }
            {
                displayChart && orders.length > 0 &&
                <div>
                    <div className='pieCharts'>
                        <PieChart
                            title='Printed Cards'
                            subTitle='Click on each slice to see breakdown'
                            series={printedCardsDataSeries}
                            drilldown={printedCardsDrillDownDataSeries}
                        />
                    </div>
                    <div className='pieCharts'>
                        <PieChart
                            title='ECards'
                            subTitle='Click on each slice to see breakdown'
                            series={eCardsDataSeries}
                            drilldown={eCardsDrillDownDataSeries}
                        />
                    </div>
                    <Chart
                        chartType='area'
                        title={title}
                        subTitle='Click and drag in the plot area to zoom in'
                        xAxisType='datetime'
                        yAxisLabel='Orders'
                        chartData={convertToChartData(orders)} />
                </div>
            }
            {
                orders.length > 0 && ordersSummaryTableConfig &&
                <div>
                    <DataTable tableHeaders={ordersSummaryTableConfig} tableData={ordersSummaryArray} showGlobalFilter={false} />
                </div>
            }
            {
                orders.length > 0 &&
                <div>
                    <DataTable tableHeaders={ordersTableConfig} tableData={ordersForTable} />
                </div>
            }
        </div>
    );
}

export default Orders;