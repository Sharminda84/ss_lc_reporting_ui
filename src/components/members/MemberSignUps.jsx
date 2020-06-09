import React, { useEffect, useState } from 'react';
import '../../App.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './MemberSignUps.css';
import DataTable from '../table/DataTable';

function MemberSignUps(props) {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const { fetchMembersData, memberSignUps } = props;

    useEffect(() => {fetchMembersData()}, [fetchMembersData]);

    const data = [
        {
            col1: 'Hello',
            col2: 'World',
        },
        {
            col1: 'react-table',
            col2: 'rocks',
        },
        {
            col1: 'whatever',
            col2: 'you want',
        },
    ];

    const cols = [
        {
            Header: 'Column 1',
            accessor: 'col1', // accessor is the "key" in the data
            filter: 'fuzzyText',
        },
        {
            Header: 'Column 2',
            accessor: 'col2',
            filter: 'fuzzyText',
        },
    ];

    return (
        <div>
            <h2>
                Specify Sign-Up date range
            </h2>
            <div className='MemberSignUpDateSection'>
                <div>From</div>
                <DatePicker
                    selected={startDate}
                    onChange={(newStartDate) => setStartDate(newStartDate)} />
                <div>To</div>
                <DatePicker
                    selected={endDate}
                    onChange={(newEndDate) => setEndDate(newEndDate)} />
                <button>Fetch</button>
            </div>
            <div className='MemberSignUpDateSection'>
                <DataTable tableHeaders={cols} tableData={data} />
            </div>
        </div>
    );
}

export default MemberSignUps;