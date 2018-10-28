import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import DeleteIcon from 'assets/icons/delete.svg';
import Button from 'app/components/button';

export default class CategoryItem extends Component {
    static propTypes = {
        categoryId: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        pairAmount: PropTypes.number.isRequired,
        isActive: PropTypes.bool,
        onClick: PropTypes.func,
        onRemoveClick: PropTypes.func,
        isReadMode: PropTypes.bool,
    }

    static defaultProps = {
        onClick: () => {},
        onRemoveClick: () => {},
        isActive: false,
        isReadMode: false,
    }

    onClick = cId => () => this.props.onClick(cId);

    onRemoveClick = cId => () => this.props.onRemoveClick(cId);

    render() {
        let {
            categoryId,
            name,
            pairAmount,
            isActive,
            isReadMode,
        } = this.props;
        let className = classnames('category-widget-element', {
            'category-widget-element__active': isActive,
        });

        return (
            <div className="category-widget">
                <div
                    className={className}
                    onClick={this.onClick(categoryId)}
                    onKeyPress={() => {}}
                    role="button"
                    tabIndex="0"
                >
                    <div>
                        <div className="category-widget-element__title">
                            <span> {name} </span>
                        </div>
                        <div className="category-widget-element__description">
                            <span> {pairAmount} pairs </span>
                        </div>
                    </div>
                </div>
                {
                    !isReadMode &&
                    <div>
                        <Button
                            type="button"
                            onClick={this.onRemoveClick(categoryId)}
                            className="btn btn-danger"
                        >
                            <img src={DeleteIcon} alt="Delete pair" />
                        </Button>
                    </div>
                }
            </div>
        );
    }
}
