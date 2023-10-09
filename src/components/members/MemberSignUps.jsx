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

    const memberSignUpsForTable = memberSignUps.flatMap(signUps => {
       return signUps.members;
    });

    const convertToChartData = () => {
        const dataX = memberSignUps.flatMap(signUps => {
            return signUps.joinStats;
        }).map(stat => {
                const joinedDate = new Date(stat.date);
                joinedDate.setHours(0, 0, 0, 0);
                return ([joinedDate.getTime(), stat.count])
         })
        return dataX
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