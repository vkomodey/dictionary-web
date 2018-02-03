import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Button from './button';

export default class Navlink extends React.Component {
    static propTypes = {
        children: PropTypes.oneOfType([
            PropTypes.element,
            PropTypes.object,
            PropTypes.string,
        ]),
    }

    static defaultProps = {
        children: <span />,
    }
    onButtonClick = (e) => {
        this.linkElem.handleClick(e);
    }
    render() {
        return (
            <Button
                className="btn btn-primary"
                onClick={this.onButtonClick}
            >
                <Link
                    className="nav-link"
                    {...this.props}
                    ref={((linkElem) => { this.linkElem = linkElem; })}
                >
                    {this.props.children}
                </Link>
            </Button>
        );
    }
}
