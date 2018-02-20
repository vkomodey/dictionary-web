import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { checkActiveCategory } from 'app/redux/actions/categories';

function mapProps(state) {
    return {
        categories: state.categories,
        activeCategoryId: state.activeCategoryId,
    };
}

function mapDispatch(dispatch) {
    return {
        checkActiveCategory: categoryId => dispatch(checkActiveCategory(categoryId)),
    };
}

@connect(mapProps, mapDispatch)
export default class ActiveCategories extends Component {
    static propTypes = {
        categories: PropTypes.arrayOf(PropTypes.shape({})),
        activeCategoryId: PropTypes.string.isRequired,
        checkActiveCategory: PropTypes.func.isRequired,
    }

    static defaultProps = {
        categories: [],
    }

    constructor(props) {
        super(props);

        this.state = {};
    }

    checkActive = categoryId =>
        () => {
            this.props.checkActiveCategory(categoryId);
        }

    render() {
        let { categories } = this.props;
        let view = categories.map((c) => {
            let isActive = c._id === this.props.activeCategoryId;

            let className = classnames('category-widget', {
                'category-widget__active': isActive,
            });

            return (
                <div
                    key={c._id}
                    className={className}
                    onClick={this.checkActive(c._id)}
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
                { view }
            </div>
        );
    }
}
