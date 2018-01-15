import React from 'react';
import Categories from 'app/modules/category/active';

export default function ActiveCategory() {
    return (
        <div className="global-category">
            <div className="global-category__title">
                <span>Choose category</span>
            </div>
            <div className="global-category__content">
                <Categories />
            </div>
        </div>
    );
}
