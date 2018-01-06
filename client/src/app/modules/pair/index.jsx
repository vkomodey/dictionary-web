import React from 'react';
import Listing from './listing';
import CreatePair from './create';
import CreateCategory from './category/create';
import Categories from './category/listing';

export default class PairsPage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="pair-page">
                <div className="pair-page__section">
                    <Categories />
                    <CreateCategory />
                    <CreatePair />
                </div>

                <div className="pair-page__section">
                    <Listing />
                </div>
            </div>
        );
    }
}
