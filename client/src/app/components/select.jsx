import React from 'react';
import PropTypes from 'prop-types';

export default class Button extends React.Component {
    static propTypes = {
        onChange: PropTypes.func.isRequired,
        options: PropTypes.arrayOf(PropTypes.shape({
            value: PropTypes.string,
            label: PropTypes.string,
        })),
    }

    static defaultProps = {
        options: [],
    }

    constructor(props) {
        super(props);

        this.state = {
            value: '',
        };
    }

    onChange = (e) => {
        let { value } = e.target;

        this.setState({ value });
        this.props.onChange(value);
    }

    render() {
        let { options } = this.props;

        return (
            <select value={this.state.value} onChange={this.onChange}>
                {options.map(op => <option value={op.value} key={op.value}> {op.label} </option> )}
            </select>
        );
    }
}
