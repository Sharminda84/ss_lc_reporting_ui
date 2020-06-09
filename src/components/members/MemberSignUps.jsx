import React, { useEffect, useState } from 'react';
import '../../App.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './MemberSignUps.css';
import DataTable from '../table/DataTable';

function MemberSignUps(props) {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const { fetchMembersData, membersTableConfig, memberSignUps } = props;

    useEffect(() => {fetchMembersData()}, [fetchMembersData]);

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
            {
                memberSignUps.length > 0 &&
                <div className='MemberSignUpDateSection'>
                    <DataTable tableHeaders={membersTableConfig} tableData={memberSignUps} />
                </div>
            }
        </div>
    );
}

export default MemberSignUps;