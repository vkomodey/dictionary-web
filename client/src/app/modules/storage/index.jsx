import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import pairApi from 'app/utils/api-services/pairs';
import { loading } from 'app/redux/actions/app';
import { addPair, removePairs } from 'app/redux/actions/pairs';
import ActiveCategories from './active.widgets';
import Listing from './listing';
import CreatePair from './create';

class PairsPage extends React.Component {
    static propTypes = {
        activeCategoryId: PropTypes.string.isRequired,
        loading: PropTypes.func.isRequired,
        addPair: PropTypes.func.isRequired,
        removePairs: PropTypes.func.isRequired,
    }

    constructor(props) {
        super(props);

        this.state = {
            pairs: [],
        };
    }

    componentDidMount() {
        this.fetchPairs(this.props.activeCategoryId);
    }

    componentWillReceiveProps(nextProps) {
        if ( this.props.activeCategoryId !== nextProps.activeCategoryId ) {
            this.fetchPairs(nextProps.activeCategoryId);
        }
    }

    onRemove = (ids) => {
        let removedPairs = this.state.pairs.filter(p => ids.includes(p._id));
        let removePromise = Array.isArray(ids) ? pairApi.removeMultiple(ids) : pairApi.removeById(ids);

        return removePromise
            .then(() => this.fetchPairs(this.props.activeCategoryId))
            .then(() => this.props.removePairs(removedPairs));
    }

    onAdded = (pair) => {
        this.props.addPair(pair);
        this.setState({
            pairs: [
                pair,
                ...this.state.pairs,
            ],
        });
    }

    fetchPairs = (categoryId) => {
        this.props.loading(true);

        pairApi.findAll({ categoryId })
            .then((pairs) => {
                this.setState({ pairs });
                this.props.loading(false);

                return pairs;
            })
            .catch((err) => {
                console.error(err); //eslint-disable-line

                this.props.loading(false);
            });
    }

    render() {
        return (
            <div className="storage-container">
                <div className="pair-page">
                    <div className="pair-page__section">
                        <CreatePair
                            onAdded={this.onAdded}
                        />
                    </div>
                    <div className="pair-page__section">
                        <Listing
                            pairs={this.state.pairs}
                            uniqKey="_id"
                            onRemove={this.onRemove}
                        />
                    </div>
                </div>
                <div>
                    <ActiveCategories />
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { activeCategoryId: state.activeCategoryId };
}

function mapDispatchToProps(dispatch) {
    return {
        loading: value => dispatch(loading(value)),
        addPair: pair => dispatch(addPair(pair)),
        removePairs: pairs => dispatch(removePairs(pairs)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(PairsPage);
