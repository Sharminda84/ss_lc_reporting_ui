import React, { useState } from 'react';
import '../../App.css';
import '../../components/orders/Orders.css';
import './CardTagsManager.css';

const CardTagsManager = ( props ) => {
    const {tags, error} = props;
    const {createTag, updateTag, deleteTag, clearError} = props;

    const [tagSearchText, setTagSearchText] = useState('');
    const [tagCreateText, setTagCreateText] = useState('');

    const [currentTag, setCurrentTag] = useState(null);
    const [currentTagText, setcurrentTagText] = useState('');
    const [currentTagLinksText, setCurrentTagLinksText] = useState('');

    const tagButtonClickHandler = (tagText) => {
        clearError();
        if (currentTagText === tagText) {
            setcurrentTagText('');
            setCurrentTag(null);
        } else {
            setcurrentTagText(tagText);
            const currentTag = tags.filter(c => c.tag === tagText)[0];
            setCurrentTag(currentTag);
            setcurrentTagText(tagText);
            const tagLinksText = currentTag
                .cardLinks
                .sort((link1, link2) => link1.tagDisplaySeq > link2.tagDisplaySeq ? 1 : -1)
                .reduce((aggregate, current) => aggregate + current.cardDesignName + '\n', '');
            setCurrentTagLinksText(tagLinksText);
        }
    }

    const deleteTagClickHandler = () => {
        clearError();
        if (currentTag === null) {
            return;
        }

        deleteTag(currentTag.tag);
        setcurrentTagText('');
        setCurrentTag(null);
    };

    const addTagClickHandler = () => {
        clearError();
        if (tagCreateText === '') {
            return;
        }

        createTag(tagCreateText);
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
                <input type='text' className='tagAddInput' placeholder='Create Tag...' onChange={e => setTagCreateText(e.target.value)} maxLength={200} />
                <button className='addButton' onClick={addTagClickHandler}>+</button>
            </div>
            <div className='tagEditPanel'>
                <h6>
                    {error}
                </h6>
                <div>
                    <input type='text'
                           className='tagAddInput'
                           placeholder='Tag name...'
                           value={currentTagText}
                           onChange={e => setcurrentTagText(e.target.value)}
                           maxLength={200} />
                </div>
                <div>
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