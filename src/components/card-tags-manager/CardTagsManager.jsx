import React, { useState } from 'react';
import '../../App.css';
import '../../components/orders/Orders.css';
import './CardTagsManager.css';

const CardTagsManager = ( props ) => {
    const { tags } = props;
    const { createTag, updateTag, deleteTag } = props;
    const [tagSearchText, setTagSearchText] = useState('');
    const [tagCreateText, setTagCreateText] = useState('');
    const [currentTag, setcurrentTag] = useState('');

    const tagButtonClickHandler = (tag) => {
        if (currentTag === tag) {
            setcurrentTag('');
        } else {
            setcurrentTag(tag);
            // TODO display the tag details here in the tag details panel....

        }
    }

    const deleteTagClickHandler = () => {
        if (currentTag === '') {
            return;
        }

        deleteTag(currentTag);
        setcurrentTag('');
    };

    const addTagClickHandler = () => {
        if (tagCreateText === '') {
            return;
        }

        createTag(tagCreateText);
    }

    const renderTagButton = (index, tag) => {
        const cssClass = tag === currentTag ? 'tagButton tagButtonSelected' : 'tagButton'

        return (
            <button key={index} className={cssClass} onClick={e => tagButtonClickHandler(tag)}>{tag}</button>
        );
    }

    const renderMatchingTags = () => {
        const matchingTags = tags
            .filter(tag => tagSearchText.trim() === '' || tag.tag.indexOf(tagSearchText) > -1)
            .map((tag, index) => renderTagButton(index, tag.tag));
        return matchingTags;
    };

    return (
        <div>
            <div className='orderTotal'>
                Tags Manager
            </div>
            <div className='tagSearchPanel'>
                <input type='text' className='tagSearchInput' placeholder='Tag Search...' onChange={e => setTagSearchText(e.target.value)} maxLength={200} />
                <button className='deleteButton' onClick={deleteTagClickHandler}>-</button>
            </div>
            <div className='tagsViewPanel'>
                {renderMatchingTags()}
            </div>
            <div className='tagSearchPanel'>
                <input type='text' className='tagAddInput' placeholder='Create Tag...' onChange={e => setTagCreateText(e.target.value)} maxLength={200} />
                <button className='addButton' onClick={addTagClickHandler}>+</button>
            </div>
            <div className='tagEditPanel'>
                <div className='tagEditPanelDiv'>
                    <h5>Tag Name</h5>
                    <input type='text' className='tagAddInput' placeholder='Create Tag...' onChange={e => setTagCreateText(e.target.value)} maxLength={200} />
                </div>
                <div className='tagEditPanelDiv'>
                    <h5>Tag Links</h5>
                    <textarea className='tagLinksTextArea' placeholder='Message...'  />
                </div>
                <button className='saveButton'>Save</button>
            </div>
        </div>
    )
};

export default CardTagsManager;