import React from 'react';
import PropTypes from 'prop-types';
import pairApi from 'app/utils/api-services/pairs';
import toastr from 'app/utils/toastr';
import Listing from './listing';
import CreatePair from './create';

export default class PairsPage extends React.Component {
    static propTypes = {
        categoryId: PropTypes.string.isRequired,
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
        try {
            if ( Array.isArray(ids) ) {
                await pairApi.removeMultiple(ids);

                toastr.warning(`${ids.length} pairs have been deleted`);
            } else {
                await pairApi.removeById(ids);

                toastr.info('Oh no! You are destroying your treasure...');
            }
        } catch (err) {
            toastr.error('Cant\'t delete pair(s)');
        }

        await this.fetchPairs(this.props.categoryId);
    }

    onAdded = async (pair) => {
        this.setState({
            pairs: [
                pair,
                ...this.state.pairs,
            ],
        });

        toastr.success('Pair has been added');
    }

    fetchPairs = async (categoryId) => {
        try {
            this.setState({
                pairs: await pairApi.findAll({ categoryId }),
            });
        } catch (err) {
            this.setState({
                pairs: [],
            });
        }
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
