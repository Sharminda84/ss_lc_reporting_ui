import React, { useEffect, useState } from 'react';
import '../../App.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './MemberSignUps.css';
import DataTable from '../table/DataTable';
import Chart from '../chart/Chart';
import _ from 'lodash';

function MemberSignUps(props) {
    const [startDate, setStartDate] = useState(new Date().getTime() - 30*24*60*60*1000);
    const [endDate, setEndDate] = useState(new Date().getTime());
    const { fetchMembersData, membersTableConfig, memberSignUps } = props;

    useEffect(() => {fetchMembersData(startDate, endDate)}, [fetchMembersData]);

    const memberSignUpsForTable = memberSignUps.map(member => {
       // member.joined = dateToString(new Date(member.joined));
       member.joined = new Date(member.joined).toDateString();
       member.emailValidated = member.emailValidated ? 'yes' : 'no';
       return member;
    });

    const convertToChartData = () => {
        const chartData = [];
        memberSignUps
            .reduce((members, member) => {
                const joinedDate = new Date(member.joined);
                joinedDate.setHours(0, 0, 0, 0);
                const key = joinedDate.getTime() + 24*60*60*1000;
                if (!members.has(key)) {
                    members.set(key, 0);
                }

                members.set(key, members.get(key) + 1);
                return members;
            }, new Map())
            .forEach((count, date) => chartData.push([date, count]));

        return _.orderBy(chartData, data => data[0], 'asc')
    }

    return (
        <div>
            <h2>
                Sign-Ups Date Range
            </h2>
            <div className='MemberSignUpDateSection'>
                <div>From</div>
                <DatePicker
                    selected={startDate}
                    onChange={(newStartDate) => setStartDate(newStartDate.getTime())} />
                <div>To</div>
                <DatePicker
                    selected={endDate}
                    onChange={(newEndDate) => setEndDate(newEndDate.getTime())} />
                <button onClick={() => fetchMembersData(startDate, endDate)}>Fetch</button>
            </div>
            {
                memberSignUps.length > 0 &&
                <div>
                    <Chart
                        chartType='area'
                        title='Member Sign Ups'
                        subTitle='Click and drag in the plot area to zoom in'
                        xAxisType='datetime'
                        yAxisLabel='Sign Ups'
                        chartData={convertToChartData()} />
                </div>
            }
            {
                memberSignUps.length > 0 &&
                <div>
                    <DataTable tableHeaders={membersTableConfig} tableData={memberSignUpsForTable} />
                </div>
            }
        </div>
    );
}

export default MemberSignUps;