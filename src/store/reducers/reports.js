import {
    customerOrdersReportCSVGenerator,
    repeatCustomersReportCSVGenerator
} from '../../components/analytics/ReportGenerators';

const initialState = {
    configuredReports: [
        {
            reportName: 'customer-orders.csv',
            reportTitle: 'Customer Order Details',
            reportDescription: 'Details about customer orders. Report fields: Member ID, Card name, ' +
                'Member create/update time, Card creation time, Card delivery date (deadline), ' +
                'No of messages, Order ID, Transaction time, Customer email, Delivery address, Total cards ordered',
            reportURL: '/reporting/analytics/orders-overview',
            reportGenerator: customerOrdersReportCSVGenerator,
        },
        {
            reportName: 'repeat-customers.csv',
            reportTitle: 'Repeat Customers',
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
