import React, { useEffect, useState } from 'react';
import '../../App.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


function MemberSignUps(props) {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const { fetchMembersData, memberSignUps } = props;

    useEffect(() => {fetchMembersData()}, [fetchMembersData]);

    return (
        <div className='AppMainSection'>
            From
            <DatePicker
                selected={startDate}
                onChange={(newStartDate) => setStartDate(newStartDate)} />

            To
            <DatePicker
                selected={endDate}
                onChange={(newEndDate) => setEndDate(newEndDate)} />

        </div>
    );
}

export default MemberSignUps;