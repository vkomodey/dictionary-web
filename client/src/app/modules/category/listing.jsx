import React, { Component } from 'react';
import PropTypes from 'prop-types';
import categoryApi from 'app/utils/api-services/categories';
import CategoryItem from './category.item';
import CreateCategory from './create';

export default class CategoriesContainer extends Component {
    static propTypes = {
        onCategoryChoosen: PropTypes.func,
        isReadMode: PropTypes.bool,
    }
    static defaultProps = {
        onCategoryChoosen: () => {},
        isReadMode: false,
    }

    constructor(props) {
        super(props);

        this.state = {
            categories: [],
            activeCategoryId: null,
        };
    }

    async componentWillMount() {
        await this.setCategories();
    }

    async setCategories() {
        let categories;

        try {
            categories = await categoryApi.findAll();
        } catch (err) {
            categories = [];
        }

        this.setState({ categories });
        this.setActive(categories[0] && categories[0]._id);
    }

    setActive = (categoryId) => {
        this.setState({ activeCategoryId: categoryId });

        this.props.onCategoryChoosen(categoryId);
    }

    removeCategory = async (categoryId) => {
        await categoryApi.removeById(categoryId);

        await this.setCategories();
    }

    addCategory = async (category) => {
        await categoryApi.create(category);

        await this.setCategories();
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
                isReadMode={this.props.isReadMode}
            />
        ));

        return (
            <div className="category-container">
                {
                    categories.length === 0 &&
                    <div className="category-container__no-info">
                        <div> Deal with it </div>
                    </div>
                }
                { view }

                { !this.props.isReadMode &&
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
