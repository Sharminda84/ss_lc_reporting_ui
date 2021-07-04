import React, { useState } from 'react';
import '../../App.css';
import '../../components/orders/Orders.css';
import './CardTagsManager.css';


// tags.filter(c => c.tag === tag)[0].cardLinks


const CardTagsManager = ( props ) => {
    const {tags} = props;
    const {createTag, updateTag, deleteTag} = props;
    const [tagSearchText, setTagSearchText] = useState('');
    const [tagUpdateText, setTagUpdateText] = useState('');

    const [currentTag, setCurrentTag] = useState(null);
    const [currentTagText, setcurrentTagText] = useState('');
    const [currentTagLinksText, setCurrentTagLinksText] = useState('');

    const tagButtonClickHandler = (tagText) => {
        if (currentTagText === tagText) {
            setcurrentTagText('');
            setCurrentTag(null);
        } else {
            setcurrentTagText(tagText);
            const currentTag = tags.filter(c => c.tag === tagText)[0];
            setCurrentTag(currentTag);
            setTagUpdateText(tagText);
            const tagLinksText = currentTag
                .cardLinks
                .sort((link1, link2) => link1.tagDisplaySeq > link2.tagDisplaySeq ? 1 : -1)
                .reduce((aggregate, current) => aggregate + current.cardDesignName + '\n', '');
            setCurrentTagLinksText(tagLinksText);
        }
    }

    const deleteTagClickHandler = () => {
        if (currentTagText === '') {
            return;
        }

        deleteTag(currentTagText);
        setcurrentTagText('');
        setCurrentTag(null);
    };

    const addTagClickHandler = () => {
        if (tagSearchText === '') {
            return;
        }

        createTag(tagSearchText);
    }

    const renderTagButton = (index, tag) => {
        const cssClass = tag === currentTagText ? 'tagButton tagButtonSelected' : 'tagButton'

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
                <input type='text' className='tagAddInput' placeholder='Create Tag...' onChange={e => setTagUpdateText(e.target.value)} maxLength={200} />
                <button className='addButton' onClick={addTagClickHandler}>+</button>
            </div>
            <div className='tagEditPanel'>
                <div>
                    <h5>Tag Name</h5>
                    <input type='text'
                           className='tagAddInput'
                           placeholder='Create Tag...'
                           value={tagUpdateText}
                           onChange={e => setTagUpdateText(e.target.value)}
                           maxLength={200} />
                </div>
                <div>
                    <h5>Tag Links</h5>
                    <textarea className='tagLinksTextArea'
                              placeholder='Tag links...'
                              value={currentTagLinksText}
                              onChange={e => setCurrentTagLinksText(e.target.value)} />
                </div>
                <button>Save</button>
            </div>
        </div>
    )
};

export default CardTagsManager;