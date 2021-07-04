import { connect } from 'react-redux';
import CardTagsManager from '../../components/card-tags-manager/CardTagsManager';
import _get from 'lodash.get';
import * as cardTagActions from '../../store/actions/cardTags';

const mapStateToProps = state => ({
    tags: _get(state, 'cardTags.cardTags', []),
    error: _get(state, 'cardTags.error', ''),
});

const mapDispatchToProps = dispatch => ({
    createTag: (tagText) => dispatch(cardTagActions.createTag(tagText)),
    updateTag: (tagId, newTagText, newTagLinks) => dispatch(cardTagActions.updateTag(tagId, newTagText, newTagLinks)),
    deleteTag: (tagText) => dispatch(cardTagActions.deleteTag(tagText)),
    clearError: () => dispatch(cardTagActions.clearError()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CardTagsManager);
