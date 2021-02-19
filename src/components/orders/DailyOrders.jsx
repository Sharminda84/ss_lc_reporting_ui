import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import DataTable from '../table/DataTable';
import '../../App.css';
import './Orders.css';

import { CARD_TYPES, generateOrdersSummaryArray, round } from './Orders';

const calculateTotalOrdersValue = (date, dailyOrders) => {
    const orders = dailyOrders.get(date.toISOString().split('T')[0]);
    if (orders === undefined) {
        return 0;
    }

    return orders.reduce((total, order) => total + order.transactionAmount, 0.0);
}

const buildOrderSummariesMaps = (date, dailyOrders, ordersSummary) => {
    const orders = dailyOrders.get(date.toISOString().split('T')[0]);
    if (orders === undefined) {
        return;
    }

    orders.forEach(order => {
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
    });
}

function DailyOrders(props) {
    const [ordersDate, setOrdersDate] = useState(new Date());
    const { fetchOrdersData, ordersSummaryTableConfig, dailyOrders } = props;
    const ordersSummary = new Map();
    buildOrderSummariesMaps(ordersDate, dailyOrders, ordersSummary);
    const ordersSummaryArray = generateOrdersSummaryArray(ordersSummary);
    const totalOrdersValue = calculateTotalOrdersValue(ordersDate, dailyOrders);

    return (
        <div>
            <div className='orderTotal'>
                Total Sales: £{round(totalOrdersValue)}
            </div>
            <div className='dailyOrdersDateSelector'>
                <h6>
                    Orders Date
                </h6>
                <DatePicker
                    selected={ordersDate}
                    onChange={(newOrdersDate) => setOrdersDate(newOrdersDate)} />
                <button onClick={() => fetchOrdersData(ordersDate.getTime())}>Fetch</button>
            </div>
            <DataTable tableHeaders={ordersSummaryTableConfig} tableData={ordersSummaryArray} showGlobalFilter={false} />
        </div>
    );
}

export default DailyOrders;