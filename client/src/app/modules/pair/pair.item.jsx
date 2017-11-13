import React from 'react';
import PropTypes from 'prop-types';

export default function PairItem(props) {
    let { firstValue, secondValue } = props;
    return (
        <div>
            <span> {firstValue} </span>
            <span>{secondValue}</span>
        </div>
    );
}

PairItem.propTypes = {
    firstValue: PropTypes.string.isRequired,
    secondValue: PropTypes.string.isRequired,
};
