import React from 'react';
import PropTypes from 'prop-types';
import Button from 'app/components/button/index';
import Input from 'app/components/input/index';
import pairApi from 'app/utils/api-services/pairs';
import Modal from 'app/components/modal/';
import PlusIcon from 'assets/icons/plus.svg';
import './style.scss';

export default class CreatePair extends React.Component {
    static propTypes = {
        onAdded: PropTypes.func,
        categoryId: PropTypes.string.isRequired,
    }

    static defaultProps = {
        onAdded: () => {},
    };

    constructor(props) {
        super(props);
        this.state = {
            firstLangExpression: '',
            secondLangExpression: '',
            isModalOpen: false,
        };
    }

    addPair = async () => {
        let pair = {
            firstLangExpression: this.state.firstLangExpression,
            secondLangExpression: this.state.secondLangExpression,
            categoryId: this.props.categoryId,
            firstLang: 'en',
            secondLang: 'ru',
        };

        this.props.onAdded(await pairApi.create(pair));

        this.setState({
            firstLangExpression: '',
            secondLangExpression: '',
        });
    }

    openModal = () => {
        this.setState({
            isModalOpen: true,
        });
    }

    closeModal = () => {
        this.setState({
            isModalOpen: false,
        });
    }

    handleChange = inputType => (e) => {
        let { firstLangExpression, secondLangExpression } = this.state;

        this.setState({
            firstLangExpression: inputType === 'en' ? e.target.value : firstLangExpression,
            secondLangExpression: inputType === 'ru' ? e.target.value : secondLangExpression,
        });
    }

    areInputsEmpty = () => {
        let { firstLangExpression, secondLangExpression } = this.state;

        return !firstLangExpression && !secondLangExpression;
    }

    render() {
        return (
            <React.Fragment>
                <Modal
                    isOpen={this.state.isModalOpen}
                    onCloseClick={this.closeModal}
                    title="Add a pair"
                    onActionClick={() => {
                        this.addPair();
                        this.closeModal();
                    }}
                    isActionButtonDisabled={!this.state.firstLangExpression || !this.state.secondLangExpression}
                    actionButtonTitle="Add"
                >
                    <div>
                        <div>
                            <Input
                                type="text"
                                placeholder="en"
                                value={this.state.firstLangExpression}
                                onChange={this.handleChange('en')}
                                className="inpt inpt--full-width"
                                autoFocus
                            />
                        </div>
                        <div>
                            <Input
                                type="text"
                                placeholder="ru"
                                value={this.state.secondLangExpression}
                                onChange={this.handleChange('ru')}
                                className="inpt inpt--full-width"
                            />
                        </div>
                    </div>
                </Modal>
                <Button
                    type="button"
                    onClick={this.openModal}
                    className="btn btn-primary btn--full-width"
                >
                    <img src={PlusIcon} alt="Add pair" />
                </Button>
            </React.Fragment>
        );
    }
}
