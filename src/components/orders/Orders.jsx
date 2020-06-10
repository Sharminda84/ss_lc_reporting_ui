import React, {useEffect} from 'react';
import '../../App.css';
import Chart from '../chart/Chart';
import DataTable from '../table/DataTable';

function Orders(props) {
    const { fetchOrdersData, ordersTableConfig, orders } = props;

    useEffect(() => {fetchOrdersData()}, [fetchOrdersData]);

    const convertToChartData = () => {
        const chartData = [];
        orders
            .reduce((allOrders, order) => {
                const key = new Date(order.transactionTime).getTime();
                if (!allOrders.has(key)) {
                    allOrders.set(key, 0);
                }

                allOrders.set(key, allOrders.get(key) + 1);
                return allOrders;
            }, new Map())
            .forEach((count, date) => chartData.push([date, count]));

        return chartData;
    }

    return (
        <div>
            {
                orders.length > 0 &&
                <div>
                    <Chart
                        chartType='area'
                        title='Orders'
                        subTitle='Click and drag in the plot area to zoom in'
                        xAxisType='datetime'
                        yAxisLabel='Orders'
                        chartData={convertToChartData()} />
                </div>
            }
            {
                orders.length > 0 && <div>
                    <DataTable tableHeaders={ordersTableConfig} tableData={orders} />
                </div>
            }
        </div>
    );
}

export default Orders;