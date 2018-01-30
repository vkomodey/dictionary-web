import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

export default class Checkbox extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isChecked: this.props.checked || false,
        }
    }

    componentWillReceiveProps(newProps) {
        this.setState({isChecked: newProps.checked});
    }

    onChange = (e) => {
        let isChecked = !this.state.isChecked;

        this.setState({isChecked});
        this.props.onChange({
            isChecked,
            value: e.target.value,
        });
    }

    render() {
        let { uniqValue } = this.props;

        return (
            <div className='checkbox-container'>
                <input 
                    type='checkbox'
                    name={uniqValue}
                    id={uniqValue}
                    value={uniqValue}
                    checked={this.state.checked}
                    onChange={this.state.onChange}
                />
                <label htmlFor={uniqValue} >
                    <span />
                </label>
            </div>
        );
    }
}

Checkbox.propTypes = {
    uniqValue: PropTypes.string.isRequired,
    checked: PropTypes.bool,
    onChange: PropTypes.func,
};
