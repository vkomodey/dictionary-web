import React from 'react';

export default class Button extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            value: '',
        };
    }

    onChange = (e) => {
        let value = e.target.value;

        this.setState({ value });
        this.props.onChange(value);
    }

    render() {
        let { options } = this.props;

        return (
            <select value={this.state.value} onChange={this.onChange}>
                {options.map(op =><option value={op.value} key={op.value}> {op.label} </option> )}
            </select>
        )
    }
}
