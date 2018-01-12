import React from 'react';
import PropTypes from 'prop-types';

function Loader(props) {
    return (
        <div>
            { props.loading
                ? <div className="overlay-container">
                    <div className="overlay-container__spinner" />
                </div>
                : '' }
        </div>
    );
}

Loader.propTypes = {
    loading: PropTypes.bool,
};

export default Loader;
