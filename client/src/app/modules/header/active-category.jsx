import React from 'react';
import Categories from 'app/modules/category/active';

class ActiveCategory extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
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
}

export default ActiveCategory;
