import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';

export default class Checkbox extends React.Component {
    static propTypes = {
        uniqValue: PropTypes.string.isRequired,
        checked: PropTypes.bool,
        onChange: PropTypes.func,
        selected: PropTypes.bool,
    }

    static defaultProps = {
        checked: false,
        onChange: () => {},
        selected: false,
    }
    constructor(props) {
        super(props);

        this.state = {
            isChecked: this.props.checked || false,
            selected: this.props.selected || false,
        };
    }

    componentWillReceiveProps(newProps) {
        this.setState({ isChecked: newProps.checked, selected: newProps.selected });
    }

    onChange = (e) => {
        let isChecked = !this.state.isChecked;

        this.setState({ isChecked });
        this.props.onChange(e, {
            isChecked,
            value: e.target.value,
        });
    }

    render() {
        let { uniqValue } = this.props;
        let spanClass = this.state.selected ? 'outlined' : '';

        return (
            <div className="checkbox-container">
                <input
                    type="checkbox"
                    name={uniqValue}
                    id={uniqValue}
                    value={uniqValue}
                    checked={this.state.isChecked}
                    onChange={this.onChange}
                />
                <label htmlFor={uniqValue} >
                    <span className={spanClass} />
                </label>
            </div>
        );
    }
}
