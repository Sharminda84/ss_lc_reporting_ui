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

export const droppedCustomersReportCSVGenerator = (data) => {
    let csv = 'Member Id, Member first name, Member last name, Member email, Marketing method, Card Id, Card creation time, Leaving date,' +
              'Card disabled, Card type, Workflow step, Leaver first name, Leaver last name, Card URL, Card From, Message count';

    data.forEach((dataRecord) => {
        csv = csv + '\r\n' +

        // 0: Member Id
        dataRecord[0] + ',' +

        // 1: Member first name
        dataRecord[1] + ',' +

        // 2: Member last name
        dataRecord[2] + ',' +

        // 3: Member email
        dataRecord[3] + ',' +

        // 4: Marketing method
        dataRecord[4] + ',' +

        // 5: Card Id
        dataRecord[5] + ',' +

        // 6: Card creation time
        new Date(parseInt(dataRecord[6])).toLocaleDateString() + ',' +

        // 7: Leaving date
        new Date(parseInt(dataRecord[7])).toLocaleDateString() + ',' +

        // 8: Card disabled
        dataRecord[8] + ',' +

        // 9: Card type
        dataRecord[9] + ',' +

        // 10: Workflow step
        dataRecord[10] + ',' +

        // 11: Leaver first name
        dataRecord[11] + ',' +

        // 12: Leaver last name
        dataRecord[12] + ',' +

        // 13: Card URL
        dataRecord[13] + ',' +

        // 14: Card From
        dataRecord[14] + ',' +

        // 15: Message count
        dataRecord[15];
    });

    return encodeURI('data:text/csv;charset=utf-8,' + csv);
};

export const cardsWithoutTargetDate = (data) => {
    let csv = 'Member Id, Member first name, Member last name, Member email, Marketing method, Card Id, Card creation time, ' +
        'Card disabled, Card type, Workflow step, Leaver first name, Leaver last name, Card URL, Card From, Message count';

    data.forEach((dataRecord) => {
        csv = csv + '\r\n' +

            // 0: Member Id
            dataRecord[0] + ',' +

            // 1: Member first name
            dataRecord[1] + ',' +

            // 2: Member last name
            dataRecord[2] + ',' +

            // 3: Member email
            dataRecord[3] + ',' +

            // 4: Marketing method
            dataRecord[4] + ',' +

            // 5: Card Id
            dataRecord[5] + ',' +

            // 6: Card creation time
            new Date(parseInt(dataRecord[6])).toLocaleDateString() + ',' +

            // 7: Card disabled
            dataRecord[7] + ',' +

            // 8: Card type
            dataRecord[8] + ',' +

            // 9: Workflow step
            dataRecord[9] + ',' +

            // 10: Leaver first name
            dataRecord[10] + ',' +

            // 11: Leaver last name
            dataRecord[11] + ',' +

            // 12: Card URL
            dataRecord[12] + ',' +

            // 13: Card From
            dataRecord[13] + ',' +

            // 14: Message count
            dataRecord[14];
    });

    return encodeURI('data:text/csv;charset=utf-8,' + csv);
};