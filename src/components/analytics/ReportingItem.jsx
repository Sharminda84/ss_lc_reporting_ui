import React from 'react';
import { REPORTING_SERVER_URL } from '../../store/sagas/ReportingServerURLs';
import './Reporting.css';

function NavigationItem(props) {

    const downloadReport = () => {
        document.body.classList.add('busy-cursor');
        props.fetchData(`${REPORTING_SERVER_URL}${props.reportURL}`)
            .then(data => {
                const reportCSV = props.reportGenerator(data);
                const link = document.createElement('a');
                link.setAttribute('href', reportCSV);
                link.setAttribute('download', props.reportName);
                document.body.classList.remove('busy-cursor');
                link.click();
            });
    };

    return (
      <div className='ReportingItem'>
          <h1>{props.reportTitle}</h1>
          <h2>{props.reportDescription}</h2>
          <br />
          <br />
          <button onClick={downloadReport}>Download Report</button>
      </div>
    );
}

export default NavigationItem;