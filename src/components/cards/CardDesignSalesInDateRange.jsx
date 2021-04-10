import React, {useState} from 'react';
import '../../App.css';
import './CardDesignSalesInDateRange.css';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import { CARD_TYPES } from '../orders/Orders';
import DatePicker from 'react-datepicker';
import DataTable from '../table/DataTable';

const CardDesignSalesInDateRange = ( props ) => {

    const { cardDesignSalesInDateRange, cardDesignViewCounts, cardDesignSalesInDateRangeTableConfig,
            fetchCardDesignsSalesInDateRange } = props;

    const [selectedCardType, setSelectedCardType] = useState(0);
    const [fromDate, setFromDate] = useState(new Date().getTime());
    const [toDate, setToDate] = useState(new Date().getTime());

    const round = num => Math.round((num + Number.EPSILON) * 100) / 100;

    const fetchCardDesignsSales = () => {
        fetchCardDesignsSalesInDateRange(fromDate, toDate);
    }

    const generateTableData = () => {
        const cardDesignViewCountsMap = new Map();
        cardDesignViewCounts.forEach(record => cardDesignViewCountsMap.set(record[0], Number(record[1])));

        const cardDesignsSales = [];
        cardDesignSalesInDateRange.
            filter(cardDesignsSalesRecord => cardDesignsSalesRecord[0] == selectedCardType).
            forEach(cardDesignsSalesRecord => {
                cardDesignsSales.push({
                    cardImage: <img src={cardDesignsSalesRecord[2]} alt={cardDesignsSalesRecord[1]} width='65px' height='92px' />,
                    cardSales: '£' + round(Number(cardDesignsSalesRecord[4])),
                    cardSequence: cardDesignsSalesRecord[5],
                    cardViews: cardDesignViewCountsMap.get(cardDesignsSalesRecord[1]),
                });
            });

        return cardDesignsSales;
    }

    const tableData = generateTableData();

    return (
        <div>
            <div className='CardDesignSalesInDateRangeHeader'>
                {
                    `Card Designs Sales Report For ${CARD_TYPES.get(selectedCardType)}`
                }
            </div>
            <div className='CardDesignSalesInDateRangeSearchOptions'>
                <h4>From Date</h4>
                <DatePicker
                    selected={fromDate}
                    onChange={(newFromDate) => setFromDate(newFromDate.getTime())}
                />

                <h4>To Date</h4>
                <DatePicker
                    selected={toDate}
                    onChange={(newToDate) => setToDate(newToDate.getTime())}
                />

                <button className='CardDesignSalesInDateRangeSearchOptionsButton' onClick={() => fetchCardDesignsSales()}>Fetch</button>
            </div>

            <div>
                <DropdownButton title='Cards Category'
                                onSelect={(cardType) => setSelectedCardType(Number(cardType)) && generateTableData()}>
                    {
                        [...CARD_TYPES.keys()]
                            .filter(key => key !== -1)
                            .map(key => <Dropdown.Item key={key} eventKey={`${key}`}>{CARD_TYPES.get(key)}</Dropdown.Item>)
                    }
                </DropdownButton>
            </div>

            <div>
                <DataTable tableHeaders={cardDesignSalesInDateRangeTableConfig} tableData={tableData} showGlobalFilter={false} />
            </div>
        </div>
    )
};

export default CardDesignSalesInDateRange;