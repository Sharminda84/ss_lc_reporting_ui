export const customerOrdersReportCSVGenerator = (data) => {
    let csv = 'MemberId, Card name, Member create/update time, Card creation time, Card deadline, No of messages, Order ID, Transaction time, Customer email, Printed/e-Card, Orders Count, Card Type';

    data.forEach((dataRecord) => {
        csv = csv + '\r\n' +
            // Member ID
            dataRecord[1] + ',' +

            // Card Name
            dataRecord[0] + ',' +

            // Member Create/Update time
            new Date(parseInt(dataRecord[2])).toLocaleDateString() + ' ' + new Date(parseInt(dataRecord[2])).toLocaleTimeString() + ',' +

            // Card creation time
            new Date(parseInt(dataRecord[3])).toLocaleDateString() + ' ' + new Date(parseInt(dataRecord[3])).toLocaleTimeString() + ',' +

            // Card delivery deadline
            new Date(parseInt(dataRecord[4])).toLocaleDateString() + ',' +

            // No of messages
            dataRecord[5] + ',' +

            // Order ID
            (dataRecord[6] !== null ? dataRecord[6] : '') + ',' +

            // Transaction Time
            (dataRecord[7] !== null ? new Date(parseInt(dataRecord[7])).toLocaleDateString() + ' ' + new Date(parseInt(dataRecord[7])).toLocaleTimeString() : '') + ',' +

            // Customer Email
            (dataRecord[8] !== null ? dataRecord[8] : '') + ',' +

            // Delivery Address
            (dataRecord[9] !== null ? (dataRecord[9].trim() === '' ? 'eCard' : 'Printed Card') : '') + ',' +

            // Orders Count
            (dataRecord[10] !== null ? dataRecord[10] : '') + ',' +

            // Card type
            (dataRecord[11] !== null ? dataRecord[11] : '');
    });

    return encodeURI('data:text/csv;charset=utf-8,' + csv);
};

export const repeatCustomersReportCSVGenerator = (data) => {
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
