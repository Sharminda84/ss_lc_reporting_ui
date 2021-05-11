import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import DataTable from '../table/DataTable';
import '../../App.css';
import './Orders.css';

import { CARD_TYPES, generateOrdersSummaryArray, round } from './Orders';
import _ from 'lodash';

const calculateTotalOrdersValue = (date, dailyOrders) => {
    const orders = dailyOrders.get(date.toISOString().split('T')[0]);
    if (orders === undefined) {
        return 0;
    }

    return orders.reduce((total, order) => total + order.tranAmount, 0.0);
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
    });

    ordersSummary.forEach((orderSummary, cardType) => {
        orderSummary.adSpend = 'N/A';
        orderSummary.profit = orderSummary.totalRevenue -
                              orderSummary.adSpend -
                              orderSummary.primeGroupCosts -
                              orderSummary.designerCommission -
                              orderSummary.stripeFee;
    });
}

function DailyOrders(props) {
    const [ordersDate, setOrdersDate] = useState(new Date());
    const { fetchOrdersData, ordersSummaryTableConfig, dailyOrders, cardDesignCounts } = props;
    const ordersSummary = new Map();
    buildOrderSummariesMaps(ordersDate, dailyOrders, ordersSummary);
    const ordersSummaryArray = generateOrdersSummaryArray(ordersSummary, cardDesignCounts);
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
