import React from 'react';
import Categories from 'app/modules/category/listing';
import Tests from './test.listing';
import './style.scss';

export default class TestContainer extends React.Component {
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
                { this.state.activeCategoryId && <Tests categoryId={this.state.activeCategoryId} /> }

                <Categories
                    onCategoryChoosen={this.onCheckActiveCategory}
                    isReadMode
                />
            </div>
        );
    }
}

