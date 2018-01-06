import React from 'react';
import { connect } from 'react-redux';
import { removeCategory } from 'app/redux/actions/categories';
import Button from 'app/components/button';
import Select from 'app/components/select';
import { checkActiveCategory } from 'app/redux/actions/categories';

class CategoryListing extends React.Component {
    constructor(props) {
        super(props);
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
    };
}

function mapDispatchToProps(dispatch) {
    return {
        checkActive: id => dispatch(checkActiveCategory(id)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryListing);
