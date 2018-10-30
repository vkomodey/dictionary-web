import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';

export default function Button(props) {
    return (
        <button
            {...props}
        >
            {props.children}
        </button>
    );
}

Button.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.element,
        PropTypes.object,
        PropTypes.string,
    ]),
};

Button.defaultProps = {
    children: <span />,
};
