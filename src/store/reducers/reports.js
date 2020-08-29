const customerOrdersReportCSVGenerator = (data) => {
    let csv = 'Card name, MemberId, Member create/update time, Card creation time, No of messages, Order ID, Transaction time, Customer email, Card Type, Orders Count';

    data.forEach((dataRecord) => {
        csv = csv + '\r\n' +
                    // Card Name
                    dataRecord[0] + ',' +

                    // Member ID
                    dataRecord[1] + ',' +

                    // Member Create/Update time
                    new Date(parseInt(dataRecord[2])).toLocaleDateString() + ' ' + new Date(parseInt(dataRecord[2])).toLocaleTimeString() + ',' +

                    // Card creation time
                    new Date(parseInt(dataRecord[3])).toLocaleDateString() + ' ' + new Date(parseInt(dataRecord[3])).toLocaleTimeString() + ',' +

                    // No of messages
                    dataRecord[4] + ',' +

                    // Order ID
                    (dataRecord[5] !== null ? dataRecord[5] : 'N/A') + ',' +

                    // Transaction Time
                    (dataRecord[6] !== null ? new Date(parseInt(dataRecord[6])).toLocaleDateString() + ' ' + new Date(parseInt(dataRecord[6])).toLocaleTimeString() : 'N/A') + ',' +

                    // Customer Email
                    (dataRecord[7] !== null ? dataRecord[7] : 'N/A') + ',' +

                    // Delivery Address
                    (dataRecord[8] !== null ? (dataRecord[8].trim() === '' ? 'eCard' : 'Printed Card') : 'N/A') + ',' +

                    // Orders Count
                    (dataRecord[9] !== null ? dataRecord[9] : 'N/A');
    });

    return encodeURI('data:text/csv;charset=utf-8,' + csv);
};

const repeatCustomersReportCSVGenerator = (data) => {
    let csv = 'Customer ID, First Name, Email, Cards Ordered';

    data.forEach((dataRecord) => {
        csv = csv + '\r\n' +
            dataRecord[0] + ',' +
            dataRecord[1] + ',' +
            dataRecord[3] + ',' +
            dataRecord[4];
    });

    return encodeURI('data:text/csv;charset=utf-8,' + csv);
};

const initialState = {
    configuredReports: [
        {
            reportName: 'customer-orders.csv',
            reportTitle: 'Customer Orders',
            reportDescription: 'Details about customer orders.',
            reportURL: '/reporting/analytics/orders-overview',
            reportGenerator: customerOrdersReportCSVGenerator,
        },
        {
            reportName: 'repeat-customers.csv',
            reportTitle: 'Repeat Customers',
            reportDescription: 'Details about each customer and how many cards have they bought with us in total.',
            reportURL: '/reporting/analytics/order-count-per-customer',
            reportGenerator: repeatCustomersReportCSVGenerator,
        },
    ],
};

const orders = (state = initialState, action) => {
    switch (action.type) {
        default: return state;
    }
};

export default orders;
