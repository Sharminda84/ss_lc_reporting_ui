import React, { useState } from 'react';
import '../../App.css';
import '../../components/orders/Orders.css';
import './CardTagsManager.css';

const CardTagsManager = ( props ) => {
    const { tags } = props;
    const [tagSearchText, setTagSearchText] = useState('');
    const [currentTagButton, setCurrentTagButton] = useState('');

    const tagButtonClicked = (tag) => {
        setCurrentTagButton(tag);

        // display the tag details here in the tag details panel....
    }

    const renderTagButton = (index, tag) => {
        const cssClass = tag === currentTagButton ? 'tagButton tagButtonSelected' : 'tagButton'

        return (
            <button key={index} className={cssClass} onClick={e => tagButtonClicked(tag)}>{tag}</button>
        );
    }

    const renderMatchingTags = () => {
        const matchingTags = tags
            .filter(tag => tagSearchText.trim() === '' || tag.tag.indexOf(tagSearchText) > -1)
            .map((tag, index) => renderTagButton(index, tag.tag));
        return matchingTags;
    };

    const onTagSearchTextChange = (text) => {
        setTagSearchText(text);
    };

    return (
        <div>
            <div className='orderTotal'>
                Tags Manager
            </div>
            <div className='tagSearchPanel'>
                <input type='text' className='tagSearchInput' placeholder='Tag Search...' onChange={e => onTagSearchTextChange(e.target.value)} maxLength={200} />
                <button className='deleteButton'>-</button>
            </div>
            <div className='tagsViewPanel'>
                {renderMatchingTags()}
            </div>
            <div className='tagSearchPanel'>
                <input type='text' className='tagAddInput' placeholder='Create Tag...' onChange={e => onTagSearchTextChange(e.target.value)} maxLength={200} />
                <button className='addButton'>+</button>
            </div>
            <div className='tagEditPanel'>
                Tags panel...
            </div>


        </div>
    )
};

export default CardTagsManager;