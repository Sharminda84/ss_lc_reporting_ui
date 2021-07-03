import { connect } from 'react-redux';
import CardTagsManager from '../../components/card-tags-manager/CardTagsManager';
import _get from 'lodash.get';
import * as cardTagActions from '../../store/actions/cardTags';

const mapStateToProps = state => ({
    tags: _get(state, 'cardTags.cardTags', []),
});

const mapDispatchToProps = dispatch => ({
    createTag: (tagText) => dispatch(cardTagActions.createTag(tagText)),
    updateTag: (tag) => dispatch(cardTagActions.updateTag(tag)),
    deleteTag: (tagText) => dispatch(cardTagActions.deleteTag(tagText)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CardTagsManager);
