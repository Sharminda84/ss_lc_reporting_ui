import React, {useEffect} from 'react';
import '../../App.css';
import Chart from '../chart/Chart';
import DataTable from '../table/DataTable';
import _ from 'lodash';
import {dateToString} from "../../utils";

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

    const ordersForSummaryTable = [];
    orders
        .reduce((ordersSummary, order) => {
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
            return ordersSummary;
        }, new Map())
        .forEach((summary, orderType) => {
            summary.eCardRevenue = `£${round(summary.eCardRevenue)}`
            summary.printedRevenue = `£${round(summary.printedRevenue)}`
            summary.totalRevenue = `£${round(summary.totalRevenue)}`
            ordersForSummaryTable.push(summary)
        });

    const ordersForTable = orders.map(order => {
        order.transactionTime = dateToString(new Date(order.transactionTime));
        order.orderType = order.deliveryAddress !== '' ? 'Physical Card' : 'E-Card';
        order.transactionAmount = `£${order.transactionAmount}`
        return order;
    });

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
                    <DataTable tableHeaders={ordersSummaryTableConfig} tableData={ordersForSummaryTable} showGlobalFilter={false} />
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