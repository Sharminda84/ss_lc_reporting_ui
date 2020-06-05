import React, { useEffect } from 'react';
import '../../App.css';

function Revenue(props) {
    const { fetchRevenueData, revenueData } = props;

    useEffect(() => {
        fetchRevenueData()
    }, [fetchRevenueData]);

    return (
        <div className='AppMainSection'>
           Revenue summary... {revenueData && revenueData.length}
        </div>
    );
}

export default Revenue;