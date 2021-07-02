import { connect } from 'react-redux';
import CardTagsManager from '../../components/card-tags-manager/CardTagsManager';
import _get from 'lodash.get';

const mapStateToProps = state => ({
    tags: _get(state, 'cardTags.cardTags', []),
});

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(CardTagsManager);
