import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import categoryApi from 'app/utils/api-services/categories';
import { loading } from 'app/redux/actions/app';
import CategoryItem from './category.item';
import CreateCategory from './create';

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
        displayAddForm: PropTypes.bool,
    }
    static defaultProps = {
        onCategoryChoosen: () => {},
        displayAddForm: true,
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
            await this.setCategories();
        } catch (err) {
            // TODO add normal error handling
            console.log(err); //eslint-disable-line
        }

        this.props.loading(false);
    }

    async setCategories() {
        let categories = await categoryApi.findAll() || [];

        this.setState({ categories });

        this.setActive(categories[0] && categories[0]._id);
    }

    setActive = (categoryId) => {
        this.setState({ activeCategoryId: categoryId });
        this.props.onCategoryChoosen(categoryId);
    }

    removeCategory = async (categoryId) => {
        this.props.loading(true);

        try {
            await categoryApi.removeById(categoryId);
            await this.setCategories();
        } catch (err) {
            // TODO add normal error handling
            console.log(err); //eslint-disable-line
        }

        this.props.loading(false);
    }

    addCategory = async (category) => {
        this.props.loading(true);

        try {
            await categoryApi.create(category);
            await this.setCategories();
        } catch (err) {
            // TODO add normal error handling
            console.log(err); //eslint-disable-line
        }

        this.props.loading(false);
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
                onRemoveClick={this.removeCategory}
            />
        ));

        return (
            <div className="category-container">
                {categories.length === 0 && <span> No categories, wannna som? </span>}
                { view }

                { this.props.displayAddForm &&
                    <div className="widgets-container__add-category">
                        <CreateCategory
                            onAdd={this.addCategory}
                        />
                    </div>
                }
            </div>
        );
    }
}
