import React, { useState } from 'react';
import '../../App.css';
import '../../components/orders/Orders.css';
import './CardTagsManager.css';

const CardTagsManager = ( props ) => {
    const {tags, currentTag, message} = props;
    const {createTag, updateTag, deleteTag, clearMessage, setCurrentTag} = props;

    const [tagSearchText, setTagSearchText] = useState('');
    const [tagCreateText, setTagCreateText] = useState('');
    const [editMode, setEditMode] = useState(false);
    const [currentTagText, setCurrentTagText] = useState('');
    const [currentTagDescriptionText, setCurrentTagDescriptionText] = useState('');
    const [currentTagLinksText, setCurrentTagLinksText] = useState('');

    const renderTagLinks = () => currentTag == null ? '' :
        currentTag
            .cardLinks
            .sort((link1, link2) => link1.tagDisplaySeq > link2.tagDisplaySeq ? 1 : -1)
            .reduce((aggregate, current) => aggregate + current.cardDesignName + '\n', '');

    const renderTagText = () => currentTag == null ? '' : currentTag.tag;

    const renderTagDescription = () => currentTag == null ? '' :
        (currentTag.description == null ? '' : currentTag.description);

    const clearLocalFormData = () => {
        setCurrentTagText('');
        setCurrentTagDescriptionText('');
        setCurrentTagLinksText('');
    };

    const setLocalFormDataFromCurrentTag = () => {
        setCurrentTagText(renderTagText());
        setCurrentTagDescriptionText(renderTagDescription());
        setCurrentTagLinksText(renderTagLinks());
    };

    const tagButtonClickHandler = (tagText) => {
        clearMessage();
        setEditMode(false);

        if (currentTag && currentTag.tag === tagText) {
            // If a selected tag is clicked again, 'unselect' it.
            setCurrentTag(null);
            clearLocalFormData();
        } else {
            const currentTag = tags.filter(c => c.tag === tagText)[0];
            setCurrentTag(currentTag);
        }
    }

    const saveTagClickHandler = () => {
        clearLocalFormData();
        setEditMode(false);
        updateTag(currentTag.id, currentTagText, currentTagDescriptionText, currentTagLinksText);
    }

    const deleteTagClickHandler = () => {
        clearMessage();
        if (currentTag === null) {
            return;
        }
        clearLocalFormData();
        setEditMode(false);
        setCurrentTag(null);
        deleteTag(currentTag.tag);
    };

    const addTagClickHandler = () => {
        clearMessage();
        setEditMode(false);
        clearLocalFormData();
        if (tagCreateText === '') {
            return;
        }

        createTag(tagCreateText);
    }

    const renderTagButton = (index, tag) => {
        let cssClass = 'tagButton';

        if (currentTag && tag === currentTag.tag) {
            cssClass = cssClass + ' tagButtonSelected';
        }

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

    const onEditButtonClicked = (e) => {
        if (e.target.checked) {
            setEditMode(true);
            setLocalFormDataFromCurrentTag();

        } else {
            setEditMode(false);
            setLocalFormDataFromCurrentTag();
        }
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
                    {message}
                </h6>
                <div className='tagEditPanelTextInputs'>
                    <input type='text'
                           className='tagNameInput'
                           placeholder='Tag name (Max 100 chars)'
                           value={editMode ? currentTagText : renderTagText()}
                           onChange={e => setCurrentTagText(e.target.value)}
                           maxLength={100}
                           disabled={!editMode} />
                    <input type='text'
                           className='tagDescriptionInput'
                           placeholder='Tag Description (Max 255 chars)'
                           value={editMode ? currentTagDescriptionText : renderTagDescription()}
                           onChange={e => setCurrentTagDescriptionText(e.target.value)}
                           maxLength={255}
                           disabled={!editMode} />
                </div>
                <div>
                    <textarea className='tagLinksTextArea'
                              placeholder='Tag links...'
                              value={editMode ? currentTagLinksText : renderTagLinks()}
                              onChange={e => setCurrentTagLinksText(e.target.value)}
                              disabled={!editMode} />
                </div>
                <div className='saveButtonPanel'>
                    <label>
                        <input type='checkbox'
                               checked={editMode}
                               onChange={onEditButtonClicked} />
                        Edit Tag
                    </label>
                    <button disabled={!editMode} onClick={saveTagClickHandler}>Save</button>
                </div>
            </div>
        </div>
    )
};

export default CardTagsManager;