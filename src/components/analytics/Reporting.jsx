import React from 'react';
import ReportingItem from './ReportingItem';
import './Reporting.css';
import { sendGetRequest } from  '../../store/networkUtils';

function Reporting(props) {

    return (
        <div className='Reporting'>
        {
            props.reports.map((report, index) =>
                <ReportingItem key={index}
                               reportName={report.reportName}
                               reportTitle={report.reportTitle}
                               reportDescription={report.reportDescription}
                               reportURL={report.reportURL}
                               reportGenerator={report.reportGenerator}
                               fetchData={sendGetRequest}
                />
            )
        }
        </div>
    );
}

export default Reporting;
