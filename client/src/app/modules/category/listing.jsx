import React from 'react';
import { connect } from 'react-redux';
import { removeCategory } from 'app/redux/actions/categories';
import Button from 'app/components/button';

class CategoriesListing extends React.Component {
    constructor(props) {
        super(props);
    }

    onRemoveClick = id => {
        return e => {
            e.preventDefault();

            return this.props.removeCategory(id);
        }
    }

    render() {
        let { categories } = this.props;
        let categoriesList = categories.map(category => (
            <tr key={category._id}>
                <td> {category.name} </td>
                <td> 
                    <Button
                        type='button'
                        onClick={this.onRemoveClick(category._id)}
                        className='btn btn-danger'
                    >
                        x
                    </Button>
                </td>
            </tr>
        ));

        return (
            <table className="tbl">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Remove</th>
                    </tr>
                </thead>
                <tbody>
                    {categoriesList.length > 0 ? categoriesList : <tr><td colSpan='2'> No categories found! </td></tr>}
                </tbody>
            </table>
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
        removeCategory: id => dispatch(removeCategory(id)), 
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoriesListing);
