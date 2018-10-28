import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

export default class CategoryItem extends Component {
    static propTypes = {
        categoryId: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        pairAmount: PropTypes.number.isRequired,
        isActive: PropTypes.bool,
        onClick: PropTypes.func,
    }

    static defaultProps = {
        onClick: () => {},
        isActive: false,
    }

    onClick = cId => () => this.props.onClick(cId);

    render() {
        let {
            categoryId,
            name,
            pairAmount,
            isActive,
        } = this.props;
        let className = classnames('category-widget', {
            'category-widget__active': isActive,
        });

        return (
            <div
                className={className}
                onClick={this.onClick(categoryId)}
                onKeyPress={() => {}}
                role="button"
                tabIndex="0"
            >
                <div>
                    <div className="category-widget__title">
                        <span> {name} </span>
                    </div>
                    <div className="category-widget__description">
                        <span> {pairAmount} pairs </span>
                    </div>
                </div>
            </div>
        );
    }
}
