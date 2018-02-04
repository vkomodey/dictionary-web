import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { removeCategory } from 'app/redux/actions/categories';
import Button from 'app/components/button';
import DeleteIcon from 'assets/icons/delete.svg';

class CategoriesListing extends React.Component {
    static propTypes = {
        removeCategory: PropTypes.func,
        categories: PropTypes.arrayOf({
            _id: PropTypes.string,
            name: PropTypes.string,
        }),
    }

    static defaultProps = {
        removeCategory: () => {},
        categories: [],
    }

    onRemoveClick = id => (e) => {
        e.preventDefault();

        return this.props.removeCategory(id);
    }

    render() {
        let { categories } = this.props;
        let categoriesList = categories.map(category => (
            <tr key={category._id}>
                <td> {category.name} </td>
                <td>
                    <Button
                        type="button"
                        onClick={this.onRemoveClick(category._id)}
                        className="btn btn-danger"
                    >
                        <img src={DeleteIcon} alt="Delete category" />
                    </Button>
                </td>
            </tr>
        ));

        return (
            <div className="category-listing">
                <table className="tbl">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Remove</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categoriesList.length > 0 ? categoriesList : <tr><td colSpan="2"> No categories found! </td></tr>}
                    </tbody>
                </table>
            </div>
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
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoriesListing);
