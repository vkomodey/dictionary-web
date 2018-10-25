import React from 'react';
import Pairs from 'app/modules/pair/index';
import Categories from 'app/modules/category/listing';

export default class Storage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeCategoryId: null,
        };
    }

    onCheckActiveCategory = categoryId => this.setState({ activeCategoryId: categoryId })

    render() {
        return (
            <div className="storage-container">
                { this.state.activeCategoryId && <Pairs
                    categoryId={this.state.activeCategoryId}
                /> }
                <Categories
                    onCategoryChoosen={this.onCheckActiveCategory}
                />
            </div>
        );
    }
}
