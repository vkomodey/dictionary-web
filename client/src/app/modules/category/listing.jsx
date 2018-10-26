import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import categoryApi from 'app/utils/api-services/categories';
import { loading } from 'app/redux/actions/app';
import CategoryItem from './category.item';

function mapDispatchToProps(dispatch) {
    return {
        loading: value => dispatch(loading(value)),
    };
}

@connect(null, mapDispatchToProps)
export default class CategoriesContainer extends Component {
    static propTypes = {
        onCategoryChoosen: PropTypes.func,
        loading: PropTypes.func.isRequired,
    }
    static defaultProps = {
        onCategoryChoosen: () => {},
    }

    constructor(props) {
        super(props);

        this.state = {
            categories: [],
            activeCategoryId: null,
        };
    }

    async componentWillMount() {
        this.props.loading(true);

        try {
            this.setState({
                categories: await categoryApi.findAll(),
            });
        } catch (err) {
            // TODO add normal error handling
            console.log(err); //eslint-disable-line
        }

        this.props.loading(false);
    }

    setActive = (categoryId) => {
        this.setState({ activeCategoryId: categoryId });
        this.props.onCategoryChoosen(categoryId);
    }

    render() {
        let { categories } = this.state;
        let view = categories.map(category => (
            <CategoryItem
                key={category._id}
                categoryId={category._id}
                name={category.name}
                pairAmount={category.pairAmount}
                isActive={category._id === this.state.activeCategoryId}
                onClick={this.setActive}
            />
        ));

        return (
            <div className="widgets-container">
                {categories.length === 0 && <span> No categories, wannna som? </span>}
                { view }
            </div>
        );
    }
}
