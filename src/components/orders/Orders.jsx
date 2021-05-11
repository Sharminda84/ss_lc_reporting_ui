import React, {useEffect, useState} from 'react';
import '../../App.css';
import './Orders.css';
import Chart from '../chart/Chart';
import PieChart from '../chart/PieChart';
import DataTable from '../table/DataTable';
import _ from 'lodash';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown'
import { dateToString, getCardName } from '../../utils';
import DatePicker from 'react-datepicker';

export const CARD_TYPE_ALL = -1000;
export const CARD_TYPES = new Map();
CARD_TYPES.set(CARD_TYPE_ALL, "All");
CARD_TYPES.set(-1, "Unknown");
CARD_TYPES.set(0, "Leaving Cards");
CARD_TYPES.set(1, "Christmas Cards");
CARD_TYPES.set(2, "Birthday Cards");
CARD_TYPES.set(3, "Maternity Leave Cards");
CARD_TYPES.set(4, "New Baby Cards");
CARD_TYPES.set(5, "New Daddy Cards");
CARD_TYPES.set(6, "Welcome Cards");
CARD_TYPES.set(7, "Retirement Cards");
CARD_TYPES.set(8, "Get Well Soon Cards");
CARD_TYPES.set(9, "Congratulations Cards");
CARD_TYPES.set(10, "Good Luck Cards");
CARD_TYPES.set(11, "Thank You Cards");
CARD_TYPES.set(12, "Thank You Teacher Cards");

export const CARD_NAMES_TO_TYPES = new Map();
CARD_NAMES_TO_TYPES.set("Leaving Cards", "LEAVING_CARD");
CARD_NAMES_TO_TYPES.set("Birthday Cards", "BIRTHDAY_CARD");
CARD_NAMES_TO_TYPES.set("Maternity Leave Cards", "MATERNITY_LEAVE_CARD");
CARD_NAMES_TO_TYPES.set("New Baby Cards", "NEW_BABY_CARD");
CARD_NAMES_TO_TYPES.set("New Daddy Cards", "FATHERHOOD_CARD");
CARD_NAMES_TO_TYPES.set("Welcome Cards", "WELCOME_CARD");
CARD_NAMES_TO_TYPES.set("Retirement Cards", "RETIREMENT_CARD");
CARD_NAMES_TO_TYPES.set("Get Well Soon Cards", "GET_WELL_SOON_CARD");
CARD_NAMES_TO_TYPES.set("Congratulations Cards", "CONGRATULATIONS_CARD");
CARD_NAMES_TO_TYPES.set("Good Luck Cards", "GOOD_LUCK_CARD");
CARD_NAMES_TO_TYPES.set("Thank You Cards", "THANK_YOU_CARD");
CARD_NAMES_TO_TYPES.set("Thank You Teacher Cards", "THANK_YOU_TEACHER_CARD");
CARD_NAMES_TO_TYPES.set("Christmas Cards", "CHRISTMAS_CARD");
//THINKING_OF_YOU
//WELCOME_CARD

const LEAVING_CARD_EPOCH = new Date(2020, 3, 13, 0, 0, 0, 0);
const LEAVING_CARD_EPOCH_TIME = LEAVING_CARD_EPOCH.getTime();

export const round = num => Math.round((num + Number.EPSILON) * 100) / 100;

// Process orders for generating the order chart
const convertToDailyChartData = (orders, cardTypeForCharts) => {
    const chartData = [];
    orders
        .filter(order => order.tranTime > LEAVING_CARD_EPOCH_TIME)
        .filter(order => cardTypeForCharts === CARD_TYPE_ALL || (order.leavingCard && cardTypeForCharts == order.leavingCard.cardType))
        .reduce((allOrders, order) => {
            const transactionDate = new Date(order.tranTime);
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
};

// Returns start of the week for a given date
const startOfTheWeekDate = (date) => {
    const startOfWeek = new Date(date);
    startOfWeek.setMilliseconds(1);
    startOfWeek.setSeconds(0);
    startOfWeek.setMinutes(0);
    startOfWeek.setHours(0);
    if (date.getDay() === 0) {
        // Sunday is 0!
        startOfWeek.setDate(date.getDate() - 6);
    } else {
        startOfWeek.setDate(date.getDate() - date.getDay() + 1);
    }

    return startOfWeek.getFullYear() + '-' + (startOfWeek.getMonth() + 1) + '-' + startOfWeek.getDate()
};

// Process orders for generating the order chart
const convertToWeeklyChartData = (orders, cardTypeForCharts) => {
    const chartData = [];
    const ordersByWeek = orders
        .filter(order => cardTypeForCharts === CARD_TYPE_ALL || (order.leavingCard && cardTypeForCharts == order.leavingCard.cardType))
        .filter(order => order.tranTime > LEAVING_CARD_EPOCH_TIME)
        .reduce((allOrders, order) => {
            const transactionDate = new Date(order.tranTime);
            const key = startOfTheWeekDate(transactionDate);

            if (!allOrders.has(key)) {
                allOrders.set(key, 0);
            }

            allOrders.set(key, allOrders.get(key) + 1);
            return allOrders;
        }, new Map());

    ordersByWeek.forEach((count, date) => chartData.push([new Date(date).getTime(), count]));
    return _.orderBy(chartData, data => data[0], 'asc');
};

// Process orders to generate the orders summary
// 1. Orders summary
// 2. Printed card Orders breakdown pie chart + drill-down data structure
// 3. ECard Orders breakdown pie chart + drill-down data structure (map)
const buildOrderSummariesMaps = (orders, 
                                 ordersSummary,
                                 printedCardOrderBreakdownPieChartData, printedCardOrderBreakdownPieChartDrilldownData,
                                 eCardOrderBreakdownPieChartData, eCardOrderBreakdownPieChartDrilldownData,
                                 adCampaignsData, campaignToCardTypeMappings) => {
    orders.forEach(order => {
        // 1. Order summary
        const cardType = CARD_TYPES.get(order.leavingCard ? order.leavingCard.cardType : -1);
        if (!ordersSummary.has(cardType)) {
            ordersSummary.set(cardType, {
                cardType,
                eCardSales: 0,
                a4Sales: 0,
                a5Sales: 0,
                eCardRevenue: 0,
                a4Revenue: 0,
                a5Revenue: 0,
                totalSales: 0,
                totalRevenue: 0,
                primeGroupCosts: 0,
                adSpend: 0,
                designerCommission: 0,
                stripeFee: 0,
                profit: 0,
            });
        }
        const orderSummary = ordersSummary.get(cardType);
        orderSummary.totalSales = orderSummary.totalSales + 1;
        orderSummary.totalRevenue = orderSummary.totalRevenue + order.tranAmount;

        const productType = _.get(order, 'orderItem.productId', 0);
        const commission = _.get(order, 'cardDesignCommission.commissionPence', 0);

        if (productType === 1) {
            // E-card
            orderSummary.eCardSales = orderSummary.eCardSales + 1;
            orderSummary.eCardRevenue = orderSummary.eCardRevenue + order.tranAmount;
            orderSummary.primeGroupCosts = orderSummary.primeGroupCosts + 0;
            orderSummary.designerCommission = orderSummary.designerCommission + (commission/100);
            orderSummary.stripeFee = orderSummary.stripeFee + 0.23;

        } else if (productType === 2) {
            // A5
            orderSummary.a5Sales = orderSummary.a5Sales + 1;
            orderSummary.a5Revenue = orderSummary.a5Revenue + order.tranAmount;
            orderSummary.primeGroupCosts = orderSummary.primeGroupCosts +
                0.85 /* Shipping */ +
                0.90 /* Printing */;
            orderSummary.designerCommission = orderSummary.designerCommission + (commission/100);
            orderSummary.stripeFee = orderSummary.stripeFee + 0.27;

        } else if (productType === 5) {
            // A4
            orderSummary.a4Sales = orderSummary.a4Sales + 1;
            orderSummary.a4Revenue = orderSummary.a4Revenue + order.tranAmount;
            orderSummary.primeGroupCosts = orderSummary.primeGroupCosts +
                1.41 /* Shipping */ +
                1.15 /* Printing */;
            orderSummary.designerCommission = orderSummary.designerCommission + (commission/100);
            orderSummary.stripeFee = orderSummary.stripeFee + 0.32;
        }

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
            cardTypeData.y = cardTypeData.y + order.tranAmount;


            if (!printedCardOrderBreakdownPieChartDrilldownData.has(cardType)) {
                printedCardOrderBreakdownPieChartDrilldownData.set(cardType, new Map());
            }
            const cardTypeMap = printedCardOrderBreakdownPieChartDrilldownData.get(cardType);
            const cardName = order.leavingCard.pdfGenerationClass;
            if (!cardTypeMap.has(cardName)) {
                cardTypeMap.set(cardName, 0);
            }
            cardTypeMap.set(cardName, cardTypeMap.get(cardName) + order.tranAmount);
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
            cardTypeData.y = cardTypeData.y + order.tranAmount;


            if (!eCardOrderBreakdownPieChartDrilldownData.has(cardType)) {
                eCardOrderBreakdownPieChartDrilldownData.set(cardType, new Map());
            }
            const cardTypeMap = eCardOrderBreakdownPieChartDrilldownData.get(cardType);
            const cardName = order.leavingCard.pdfGenerationClass;
            if (!cardTypeMap.has(cardName)) {
                cardTypeMap.set(cardName, 0);
            }
            cardTypeMap.set(cardName, cardTypeMap.get(cardName) + order.tranAmount);
        }
    });

    const adSpend = new Map();
    adCampaignsData.forEach(adCampaign => {
        const cardType = campaignToCardTypeMappings[adCampaign.campaignName];
        if (adSpend.has(cardType)) {
            const updatedAdSpend = adSpend.get(cardType) + adCampaign.cost;
            adSpend.set(cardType, updatedAdSpend);
        } else {
            adSpend.set(cardType, adCampaign.cost);
        }
    });

    ordersSummary.forEach((orderSummary, cardType) => {
        orderSummary.adSpend = adSpend.has(cardType) ? adSpend.get(cardType) : 0;
        orderSummary.profit = orderSummary.totalRevenue -
                              orderSummary.adSpend -
                              orderSummary.primeGroupCosts -
                              orderSummary.designerCommission -
                              orderSummary.stripeFee;
    });
};

export const generateOrdersSummaryArray = (ordersSummary, cardDesignCounts) => {
    const ordersSummaryClone = _.cloneDeep(ordersSummary);
    const ordersSummaryArray = [];
    ordersSummaryClone.forEach((summary, orderType) => {
        summary.eCardRevenue = `£${round(summary.eCardRevenue)}`
        summary.a4Revenue = `£${round(summary.a4Revenue)}`
        summary.a5Revenue = `£${round(summary.a5Revenue)}`
        summary.totalRevenue = `£${round(summary.totalRevenue)}`
        summary.primeGroupCosts = `£${round(summary.primeGroupCosts)}`
        summary.adSpend = `£${round(summary.adSpend)}`
        summary.designerCommission = `£${round(summary.designerCommission)}`
        summary.stripeFee = `£${round(summary.stripeFee)}`
        summary.profit = `£${round(summary.profit)}`
        summary.cardCount = cardDesignCounts.get(CARD_NAMES_TO_TYPES.get(summary.cardType));
        ordersSummaryArray.push(summary);
    });

    return ordersSummaryArray;
};

export const calculateTotalProfitAndLoss = ordersSummary => {
    let totalProfitAndLoss = 0.0;
    ordersSummary.forEach((summary, orderType) => {
        totalProfitAndLoss = totalProfitAndLoss + summary.profit;
    });
    return totalProfitAndLoss;
};

const generateOrdersForTable = orders => orders.map(order => {
    const clonedOrder = _.cloneDeep(order);
    clonedOrder.tranTime = dateToString(new Date(clonedOrder.tranTime));
    clonedOrder.orderType = clonedOrder.deliveryAddress !== '' ? 'Physical Card' : 'E-Card';
    clonedOrder.tranAmount = `£${clonedOrder.tranAmount}`
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
            if (cardInfo.get(cardNameShort) != null) {
                let cardURL = cardInfo.get(cardNameShort).cardURL;
                cardTypeRecord.data.push({
                    name: cardNameShort,
                    y: cardNameDetails,
                    imageSource: cardURL
                });
            }
        });
        printedCardsDrillDownData.push(cardTypeRecord);
    });

    return {
        series: printedCardsDrillDownData
    };
}

function Orders(props) {
    const { fetchOrdersData, ordersTableConfig, ordersSummaryTableConfig, orders, adCampaignsData,
            campaignToCardTypeMappings, displayChart = true, title, cardInfo, showOrderDetailsTable = false,
            showWeeklyOrdersChart = true, isAllTimeView = false, cardDesignCounts } = props;

    const [cardTypeForCharts, setCardTypeForCharts] = useState(CARD_TYPE_ALL);
    const [fromDate, setFromDate] = useState(new Date().getTime());
    useEffect(() => {fetchOrdersData(fromDate)}, [fetchOrdersData]);

    const ordersSummary = new Map();
    const printedCardOrderBreakdownPieChartData = new Map();
    const printedCardOrderBreakdownPieChartDrilldownData = new Map();
    const eCardOrderBreakdownPieChartData = new Map();
    const eCardOrderBreakdownPieChartDrilldownData = new Map();
    buildOrderSummariesMaps(orders, ordersSummary, 
        printedCardOrderBreakdownPieChartData, printedCardOrderBreakdownPieChartDrilldownData, 
        eCardOrderBreakdownPieChartData, eCardOrderBreakdownPieChartDrilldownData,
        adCampaignsData, campaignToCardTypeMappings);
    
    // Generate data structures for presentation
    const totalOrdersValue = orders.reduce((total, order) => total + order.tranAmount, 0.0);
    const ordersSummaryArray = generateOrdersSummaryArray(ordersSummary, cardDesignCounts);
    const ordersForTable = generateOrdersForTable(orders);
    const printedCardsDataSeries = generateCardDataSeries('PrintedCards', printedCardOrderBreakdownPieChartData);
    const printedCardsDrillDownDataSeries = generateCardDrilldownDataSeries(printedCardOrderBreakdownPieChartDrilldownData, cardInfo);
    const eCardsDataSeries = generateCardDataSeries('eCards', eCardOrderBreakdownPieChartData);
    const eCardsDrillDownDataSeries = generateCardDrilldownDataSeries(eCardOrderBreakdownPieChartDrilldownData, cardInfo);
    const totalProfitAndLoss = calculateTotalProfitAndLoss(ordersSummary);

    const triggerRefresh = (newFromDate) => {
        fetchOrdersData(newFromDate);
    }

    return (
        <div>
            {
                orders.length === 0 &&
                <div>
                </div>
            }
            {
                orders.length > 0 &&
                <div className='orderTotal'>
                    Total Sales: £{round(totalOrdersValue)} &nbsp; &nbsp; P&L: £{round(totalProfitAndLoss)}
                </div>
            }
            {
                !isAllTimeView &&
                <div className='dateSelector'>
                    <h4>Click to choose a different date</h4>
                    <DatePicker
                        selected={fromDate}
                        onChange={(newFromDate) => setFromDate(newFromDate.getTime()) || triggerRefresh(newFromDate.getTime())}
                    />
                </div>
            }
            {
                orders.length > 0 && ordersSummaryTableConfig &&
                <div className='OrdersSummaryTable'>
                    <DataTable tableHeaders={ordersSummaryTableConfig} tableData={ordersSummaryArray} showGlobalFilter={false} />
                </div>
            }
            {
                orders.length > 0 && showOrderDetailsTable &&
                <div>
                    <DataTable tableHeaders={ordersTableConfig} tableData={ordersForTable} />
                </div>
            }
            {
                displayChart && orders.length > 0 &&
                <div className='charts'>
                    <div className='pieCharts'>
                        <PieChart
                            title='Printed Cards'
                            // subTitle='Click on each slice to see breakdown'
                            series={printedCardsDataSeries}
                            // drilldown={printedCardsDrillDownDataSeries}
                        />
                    </div>
                    <div className='pieCharts'>
                        <PieChart
                            title='ECards'
                            // subTitle='Click on each slice to see breakdown'
                            series={eCardsDataSeries}
                            // drilldown={eCardsDrillDownDataSeries}
                        />
                    </div>
                    <div className='chartDropDown'>
                        <DropdownButton title='Card Type' onSelect={(cardType) => setCardTypeForCharts(Number(cardType))}>
                            {
                                [...CARD_TYPES.keys()]
                                    .filter(key => key !== -1)
                                    .map(key => <Dropdown.Item eventKey={`${key}`}>{CARD_TYPES.get(key)}</Dropdown.Item>)
                            }
                        </DropdownButton>
                    </div>
                    {
                        showWeeklyOrdersChart &&
                        <Chart
                            chartType='column'
                            title={`${title} (Weekly Breakdown) - ${CARD_TYPES.get(cardTypeForCharts)}`}
                            subTitle='Click and drag in the plot area to zoom in'
                            xAxisType='datetime'
                            yAxisLabel='Weekly Orders'
                            chartData={convertToWeeklyChartData(orders, cardTypeForCharts)} />
                    }
                    <Chart
                        chartType='area'
                        title={`${title} (Daily Breakdown) - ${CARD_TYPES.get(cardTypeForCharts)}`}
                        subTitle='Click and drag in the plot area to zoom in'
                        xAxisType='datetime'
                        yAxisLabel='Orders'
                        chartData={convertToDailyChartData(orders, cardTypeForCharts)} />
                </div>
            }
        </div>
    );
}

export default Orders;
