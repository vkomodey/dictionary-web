import React from 'react';
import Listing from './main.listing';
import CreateCategory from './create';

export default function CategoryPage() {
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
