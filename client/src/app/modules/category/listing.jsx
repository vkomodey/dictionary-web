import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from 'app/components/button/index';
import categoryApi from 'app/utils/api-services/categories';
import DeleteIcon from 'assets/icons/delete.svg';
import CategoryItem from './category.item';
import CreateCategory from './create';
import './style.scss';

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
        this.setActive(categories[0] && categories[0].id);
    }

    setActive = (categoryId) => {
        this.setState({ activeCategoryId: categoryId });

        this.props.onCategoryChoosen(categoryId);
    }

    removeCategory = categoryId => async () => {
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
            <div key={category.id} className="category-item-container">
                <CategoryItem
                    categoryId={category.id}
                    name={category.name}
                    pairAmount={category.pairAmount}
                    isActive={category.id === this.state.activeCategoryId}
                    onClick={this.setActive}
                    isReadMode={this.props.isReadMode}
                />
                {
                    !this.props.isReadMode &&
                    <div>
                        <Button
                            type="button"
                            onClick={this.removeCategory(category.id)}
                            className="btn btn-danger"
                        >
                            <img src={DeleteIcon} alt="Delete pair" />
                        </Button>
                    </div>
                }
            </div>
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
