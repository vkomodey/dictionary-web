import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Input from 'app/components/input/index';
import Button from 'app/components/button/index';

export default class CreateCategory extends Component {
    static propTypes = {
        onAdd: PropTypes.func,
    }

    static defaultProps = {
        onAdd: () => {},
    }

    constructor(props) {
        super(props);

        this.state = {
            value: '',
        };
    }

    handleChange = (rEvent) => {
        let { value } = rEvent.target;

        this.setState({ value });
    }

    submit = (event) => {
        event.preventDefault();

        this.props.onAdd({
            name: this.state.value,
            firstLang: 'en',
            secondLang: 'ru',
        });

        this.setState({
            value: '',
        });
    }

    render() {
        return (
            <form>
                <Input
                    type="text"
                    placeholder="New Category"
                    onChange={this.handleChange}
                    value={this.state.value}
                    className="inpt"
                />
                <Button
                    type="submit"
                    onClick={this.submit}
                    disabled={!this.state.value}
                    className="btn btn-primary"
                >
                    Add
                </Button>
            </form>
        );
    }
}
