import React, {useEffect} from 'react';
import '../../App.css';
import './Orders.css';
import Chart from '../chart/Chart';
import PieChart from '../chart/PieChart';
import DataTable from '../table/DataTable';
import _ from 'lodash';
import { dateToString } from "../../utils";

const CARD_TYPES = new Map();
CARD_TYPES.set(-1, "Unknown");
CARD_TYPES.set(0, "Leaving Card");
CARD_TYPES.set(1, "Christmas Card");
CARD_TYPES.set(2, "Birthday Card");
CARD_TYPES.set(3, "Maternity Leave Card");
CARD_TYPES.set(4, "New Baby Card");
CARD_TYPES.set(5, "New Daddy Card");
CARD_TYPES.set(6, "Welcome Card");

function Orders(props) {
    const { fetchOrdersData, ordersTableConfig, ordersSummaryTableConfig, orders, displayChart = true, title } = props;

    useEffect(() => {fetchOrdersData()}, [fetchOrdersData]);

    const round = num => Math.round((num + Number.EPSILON) * 100) / 100

    // Process orders for generating the order chart
    const convertToChartData = () => {
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
            .forEach((count, date) => chartData.push([new Date(date).getTime(), count]));

        return _.orderBy(chartData, data => data[0], 'asc');
    }

    // Process orders to generate the orders summary
    // 1. Orders summary
    // 2. Printed card Orders breakdown pie chart + drill-down data structure
    // 3. ECard Orders breakdown pie chart + drill-down data structure (map)

    const ordersSummary = new Map();
    const printedCardOrderBreakdownPieChartData = new Map();
    const printedCardOrderBreakdownPieChartDrilldownData = new Map();
    const eCardOrderBreakdownPieChartData = new Map();
    const eCardOrderBreakdownPieChartDrilldownData = new Map();
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

    // Generate data structures for presentation

    // Orders Summary
    const generateOrdersSummary = [];
    ordersSummary.forEach((summary, orderType) => {
        summary.eCardRevenue = `£${round(summary.eCardRevenue)}`
        summary.printedRevenue = `£${round(summary.printedRevenue)}`
        summary.totalRevenue = `£${round(summary.totalRevenue)}`
        generateOrdersSummary.push(summary);
    });

    // Process orders to generate the order details table data
    const ordersForTable = orders.map(order => {
        order.transactionTime = dateToString(new Date(order.transactionTime));
        order.orderType = order.deliveryAddress !== '' ? 'Physical Card' : 'E-Card';
        order.transactionAmount = `£${order.transactionAmount}`
        return order;
    });

    // Printed cards pie chart data
    const printedCardsData = [];
    const printedCardsDrillDownData = [];
    printedCardOrderBreakdownPieChartData.forEach((cardTypeDetails, cardType) => {
        printedCardsData.push(cardTypeDetails);
    });
    printedCardOrderBreakdownPieChartDrilldownData.forEach((cardTypeDetails, cardType) => {
        const cardTypeRecord = {
            name: cardType,
            id: cardType,
            data: []
        };
        cardTypeDetails.forEach((cardNameDetails, cardName) => {
            cardTypeRecord.data.push([cardName.split('.')[cardName.split('.').length-1], cardNameDetails]);
        });
        printedCardsDrillDownData.push(cardTypeRecord);
    });
    const printedCardsDataSeries = [];
    printedCardsDataSeries.push({
        name: 'PrintedCards',
        colorByPoint: true,
        data: printedCardsData
    });
    const printedCardsDrillDownDataSeries = {
        series: printedCardsDrillDownData
    };

    // ECards pie chart data
    const eCardsData = [];
    const eCardsDrillDownData = [];
    eCardOrderBreakdownPieChartData.forEach((cardTypeDetails, cardType) => {
        eCardsData.push(cardTypeDetails);
    });
    eCardOrderBreakdownPieChartDrilldownData.forEach((cardTypeDetails, cardType) => {
        const cardTypeRecord = {
            name: cardType,
            id: cardType,
            data: []
        };
        cardTypeDetails.forEach((cardNameDetails, cardName) => {
            cardTypeRecord.data.push([cardName.split('.')[cardName.split('.').length-1], cardNameDetails]);
        });
        eCardsDrillDownData.push(cardTypeRecord);
    });
    const eCardsDataSeries = [];
    eCardsDataSeries.push({
        name: 'ECards',
        colorByPoint: true,
        data: eCardsData
    });
    const eCardsDrillDownDataSeries = {
        series: eCardsDrillDownData
    };

    return (
        <div>
            {
                orders.length === 0 && <div>
                    No Orders...
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
                        chartData={convertToChartData()} />
                </div>
            }
            {
                orders.length > 0 && ordersSummaryTableConfig &&
                <div>
                    <DataTable tableHeaders={ordersSummaryTableConfig} tableData={generateOrdersSummary} showGlobalFilter={false} />
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