import React from 'react';
import { connect } from 'react-redux';
import Listing from './listing';
import CreatePair from './create';
import pairApi from 'app/utils/api-services/pairs';
import { loading } from 'app/redux/actions/app';

class PairsPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            pairs: [],
        };
    }

    componentWillReceiveProps(nextProps) {
        if ( this.props.activeCategoryId !== nextProps.activeCategoryId ) {
            this.fetchPairs(nextProps.activeCategoryId);
        }
    }

    componentDidMount() {
        this.fetchPairs(this.props.activeCategoryId);
    }

    fetchPairs = (categoryId) => {
        this.props.loading(true);

        pairApi.findAll({categoryId})
            .then(pairs => {
                this.setState({pairs});
                this.props.loading(false);
            })
            .catch(err => {
                console.error(err);

                this.props.loading(false);
            });
    }

    onRemove = (ids) => {
        let removePromise =  Array.isArray(ids) ? pairApi.removeMultiple(ids) : pairApi.removeById(ids);

        return removePromise.then(() => this.fetchPairs(this.props.activeCategoryId));
    }


    onAdded = pair => {
        this.setState({
            pairs: [
                pair,
                ...this.state.pairs,
            ],
        });
    }

    render() {
        return (
            <div className="pair-page">
                <div className="pair-page__section">
                    <CreatePair
                        onAdded={this.onAdded}
                    />
                </div>
        
                <div className="pair-page__section">
                    <Listing
                        pairs={this.state.pairs}
                        uniqKey='_id'
                        onRemove={this.onRemove}
                    />
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { activeCategoryId: state.activeCategoryId };
};

function mapDispatchToProps(dispatch) {
    return {
        loading: value => dispatch(loading(value)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PairsPage);
