import {
    customerOrdersReportCSVGenerator,
    repeatCustomersReportCSVGenerator
} from '../../components/analytics/ReportGenerators';

const initialState = {
    configuredReports: [
        {
            reportName: 'orders.csv',
            reportTitle: 'Orders',
            reportDescription: 'Details about customer orders. Report fields: Member ID, Card name, ' +
                'Member create/update time, Card creation time, Card delivery date (deadline), ' +
                'No of messages, Order ID, Transaction time, Customer email, Printed/e-Card, Total cards ordered, Card type',
            reportURL: '/reporting/analytics/orders-overview',
            reportGenerator: customerOrdersReportCSVGenerator,
        },
        {
            reportName: 'customer-orders-count.csv',
            reportTitle: 'Customer Orders Count',
            reportDescription: 'Gives total cards bought by each member. Report fields: Customer ID, First Name, Email, No of cards ordered.',
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
