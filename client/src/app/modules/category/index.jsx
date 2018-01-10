import React from 'react';
import Listing from './listing';
import CreateCategory from './create';

export default class CategoryPage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="category-page">
                <div className="category-page__section">
                    <CreateCategory />
                </div>

                <div className="category-page__section">
                    <Listing />
                </div>
            </div>
        );
    }
}
