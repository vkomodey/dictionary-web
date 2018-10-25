import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import categoryApi from 'app/utils/api-services/categories';

export default class CategoriesContainer extends Component {
    static propTypes = {
        onCategoryChoosen: PropTypes.func,
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
        this.setState({
            categories: await categoryApi.findAll(),
        });
    }

    onSetActive = categoryId =>
        () => {
            this.setState({ activeCategoryId: categoryId });
            this.props.onCategoryChoosen(categoryId);
        }

    render() {
        let { categories } = this.state;
        let view = categories.map((c) => {
            let isActive = c._id === this.state.activeCategoryId;

            let className = classnames('category-widget', {
                'category-widget__active': isActive,
            });

            return (
                <div
                    key={c._id}
                    className={className}
                    onClick={this.onSetActive(c._id)}
                    onKeyPress={() => {}}
                    role="button"
                    tabIndex="0"
                >
                    <div className="category-widget__title">
                        <span> {c.name} </span>
                    </div>
                    <div className="category-widget__content">
                        <span> {c.pairAmount} pairs </span>
                    </div>
                </div>
            );
        });

        return (
            <div className="widgets-container">
                {categories.length === 0 && <span> No categories, wannna som? </span>}
                { view }
            </div>
        );
    }
}
