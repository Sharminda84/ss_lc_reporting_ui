import React, { useEffect, useState } from 'react';
import '../../App.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './MemberSignUps.css';
import DataTable from '../table/DataTable';
import Chart from '../chart/Chart';

function MemberSignUps(props) {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const { fetchMembersData, membersTableConfig, memberSignUps } = props;

    useEffect(() => {fetchMembersData(startDate, endDate)}, [fetchMembersData]);

    const convertToChartData = () => {
        const chartData = [];
        memberSignUps
            .reduce((members, member) => {
                const key = new Date(member.joined).getTime();
                if (!members.has(key)) {
                    members.set(key, 0);
                }

                members.set(key, members.get(key) + 1);
                return members;
            }, new Map())
            .forEach((count, date) => chartData.push([date, count]));

        return chartData;
    }

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
                    <DataTable tableHeaders={membersTableConfig} tableData={memberSignUps} />
                </div>
            }
        </div>
    );
}

export default MemberSignUps;