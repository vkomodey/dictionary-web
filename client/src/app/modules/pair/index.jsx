import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import pairApi from 'app/utils/api-services/pairs';
import { loading } from 'app/redux/actions/app';
import Listing from './listing';
import CreatePair from './create';

function mapDispatchToProps(dispatch) {
    return {
        loading: value => dispatch(loading(value)),
    };
}

@connect(null, mapDispatchToProps)
export default class PairsPage extends React.Component {
    static propTypes = {
        categoryId: PropTypes.string.isRequired,
        loading: PropTypes.func.isRequired,
    }

    constructor(props) {
        super(props);

        this.state = {
            pairs: [],
        };
    }

    componentDidMount() {
        this.fetchPairs(this.props.categoryId);
    }

    componentWillReceiveProps(nextProps) {
        if ( this.props.categoryId !== nextProps.categoryId ) {
            this.fetchPairs(nextProps.categoryId);
        }
    }

    onRemove = async (ids) => {
        this.props.loading(true);

        try {
            if ( Array.isArray(ids) ) {
                await pairApi.removeMultiple(ids);
            } else {
                await pairApi.removeById(ids);
            }

            await this.fetchPairs(this.props.categoryId);
        } catch (err) {
            // TODO handle the error properly
            console.log(err); // eslint-disable-line
        }

        this.props.loading(false);
    }

    onAdded = async (pair) => {
        this.setState({
            pairs: [
                pair,
                ...this.state.pairs,
            ],
        });
    }

    fetchPairs = async (categoryId) => {
        this.props.loading(true);

        try {
            this.setState({
                pairs: await pairApi.findAll({ categoryId }),
            });
        } catch (err) {
            // TODO handle the error properly
            console.error(err); // eslint-disable-line
        }

        this.props.loading(false);
    }

    render() {
        return (
            <div className="pair-page">
                <div className="pair-page__section">
                    <CreatePair
                        onAdded={this.onAdded}
                        categoryId={this.props.categoryId}
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
        );
    }
}
