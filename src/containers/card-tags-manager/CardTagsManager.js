import { connect } from 'react-redux';
import CardTagsManager from '../../components/card-tags-manager/CardTagsManager';
import _get from 'lodash.get';
import * as cardTagActions from '../../store/actions/cardTags';

const mapStateToProps = state => ({
    tags: _get(state, 'cardTags.cardTags', []),
    currentTag: _get(state, 'cardTags.currentTag', []),
    message: _get(state, 'cardTags.message', ''),
});

const mapDispatchToProps = dispatch => ({
    createTag: (tagText) => dispatch(cardTagActions.createTag(tagText)),
    updateTag: (tagId, newTagText, newTagDescription, newTagLinks) => dispatch(cardTagActions.updateTag(tagId, newTagText, newTagDescription, newTagLinks)),
    deleteTag: (tagText) => dispatch(cardTagActions.deleteTag(tagText)),
    clearMessage: () => dispatch(cardTagActions.clearMessage()),
    setCurrentTag: (tag) => dispatch(cardTagActions.setCurrentTag(tag)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CardTagsManager);
