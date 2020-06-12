import React, {useEffect} from 'react';
import '../../App.css';
import Chart from '../chart/Chart';
import DataTable from '../table/DataTable';
import _ from 'lodash';

function Orders(props) {
    const { fetchOrdersData, ordersTableConfig, orders, displayChart = true } = props;

    useEffect(() => {fetchOrdersData()}, [fetchOrdersData]);

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

    const convertToTableData = () => orders.map(order => _.merge(order, {transactionTime: new Date(order.transactionTime).toLocaleDateString('en-GB')}));

    return (
        <div>
            {
                displayChart && orders.length > 0 &&
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