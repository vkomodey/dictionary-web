import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { removeCategory } from 'app/redux/actions/categories';
import Button from 'app/components/button';
import Select from 'app/components/select';
import { checkActiveCategory } from 'app/redux/actions/categories';

class CategoryListing extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillReceiveProps(nextProps) {
        let oldCategories = this.props.categories;
        let newCategories = nextProps.categories;
        let oldCategoriesLen = oldCategories.length;
        let newCategoriesLen = newCategories.length;

        if ( oldCategoriesLen === newCategoriesLen ) {
            return;
        }

        // Category has been deleted. Should activate first category
        if ( oldCategoriesLen === newCategoriesLen + 1 ) {
            let deletedCategoryId = _.difference(oldCategories, newCategories)[0]._id;

            if ( deletedCategoryId === this.props.activeCategoryId ) {
                return this.props.checkActive(newCategories[0]._id);
            }
        }
        
        // New category has been added. Should activate this category.
        if ( newCategoriesLen === oldCategoriesLen + 1 ) {
            let addedCategoryId = _.difference(newCategories, oldCategories)[0]._id;

            return this.props.checkActive(addedCategoryId);
        }
    }

    checkActive = id => {
        return this.props.checkActive(id);
    }

    render() {
        let { categories } = this.props;
        let categoriesOptions = categories.map(category => ({
            value: category._id,
            label: category.name,
        }));

        return (
            <Select options={categoriesOptions} onChange={this.checkActive}/>
        );
    }
}

function mapStateToProps(state) {
    return {
        categories: state.categories,
        activeCategoryId: state.activeCategoryId,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        checkActive: id => dispatch(checkActiveCategory(id)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryListing);
