import { connect } from 'react-redux';
import CardTagsManager from '../../components/card-tags-manager/CardTagsManager';
import _get from 'lodash.get';
import * as cardTagActions from '../../store/actions/cardTags';
import * as globalActions from '../../store/actions/global';

const mapStateToProps = state => ({
    tags: _get(state, 'cardTags.cardTags', []),
    currentTag: _get(state, 'cardTags.currentTag', null),
    message: _get(state, 'cardTags.message', ''),
});

const mapDispatchToProps = dispatch => ({
    createTag: (tagText) => dispatch(cardTagActions.createTag(tagText)),
    updateTag: (tagId, newTagText, newTagDescription, newTagLinks) => dispatch(cardTagActions.updateTag(tagId, newTagText, newTagDescription, newTagLinks)),
    // deleteTag: (tagText) => dispatch(cardTagActions.deleteTag(tagText)),
    setMessage: (message) => dispatch(cardTagActions.setMessage(message)),
    clearMessage: () => dispatch(cardTagActions.clearMessage()),
    setCurrentTag: (tag) => dispatch(cardTagActions.setCurrentTag(tag)),
    setConfirmationMessage: (message) => dispatch(globalActions.setConfirmationMessage(message)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CardTagsManager);
