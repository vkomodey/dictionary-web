import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Input from 'app/components/input/index';
import Button from 'app/components/button/index';
import Modal from 'app/components/modal/';

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
            isModalOpen: false,
        };
    }

    handleChange = (rEvent) => {
        let { value } = rEvent.target;

        this.setState({ value });
    }

    addCategory = () => {
        this.props.onAdd({
            name: this.state.value,
            firstLang: 'en',
            secondLang: 'ru',
        });

        this.setState({
            value: '',
            isModalOpen: false,
        });
    }

    openModal = (e) => {
        e.preventDefault();

        this.setState({
            isModalOpen: true,
        });
    }

    closeModal = () => {
        this.setState({
            isModalOpen: false,
        });
    }

    render() {
        return (
            <div>
                <Modal
                    isOpen={this.state.isModalOpen}
                    onCloseClick={this.closeModal}
                    title="Add a category"
                    onActionClick={this.addCategory}
                    isActionButtonDisabled={!this.state.value}
                    actionButtonTitle="Add"
                >
                    <Input
                        type="text"
                        placeholder="New Category"
                        onChange={this.handleChange}
                        value={this.state.value}
                        className="inpt inpt--full-width"
                    />
                </Modal>
                <Button
                    type="button"
                    onClick={this.openModal}
                    className="btn btn-primary btn--full-width"
                >
                    Add
                </Button>
            </div>
        );
    }
}
