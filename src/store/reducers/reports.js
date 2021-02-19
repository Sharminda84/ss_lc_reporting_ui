import {
    customerOrdersReportCSVGenerator,
    repeatCustomersReportCSVGenerator,
    droppedCustomersReportCSVGenerator,
    cardsWithoutTargetDate,
    cardDesignSales,
} from '../../components/analytics/ReportGenerators';

const initialState = {
    configuredReports: [
        {
            reportName: 'all-orders.csv',
            reportTitle: 'All Orders',
            reportDescription: 'Details about customer orders.',
            reportURL: '/v1/lc/reporting/analytics/orders-overview',
            reportGenerator: customerOrdersReportCSVGenerator,
        },
        {
            reportName: 'customer-orders-count.csv',
            reportTitle: 'Customer Orders Count',
            reportDescription: 'Gives total cards bought by each member.',
            reportURL: '/v1/lc/reporting/analytics/order-count-per-customer',
            reportGenerator: repeatCustomersReportCSVGenerator,
        },
        {
            reportName: 'dropped-customers.csv',
            reportTitle: 'Dropped Customers Report',
            reportDescription: 'Report of all cards where leaving date was present + has passed + no order was placed.',
            reportURL: '/v1/lc/reporting/analytics/dropped-customers',
            reportGenerator: droppedCustomersReportCSVGenerator,
        },
        {
            reportName: 'cards-without-target-date.csv',
            reportTitle: 'Cards Without Target Date Report',
            reportDescription: 'Report of all cards that do not have a target date.',
            reportURL: '/v1/lc/reporting/analytics/cards-without-target-date',
            reportGenerator: cardsWithoutTargetDate,
        },
        {
            reportName: 'cards-sales.csv',
            reportTitle: 'Cards Sales Report',
            reportDescription: 'Sales figures for all cards.',
            reportURL: '/v1/lc/reporting/cards/top',
            reportGenerator: cardDesignSales,
        },
    ],
};

const orders = (state = initialState, action) => {
    switch (action.type) {
        default: return state;
    }
};

export default orders;
