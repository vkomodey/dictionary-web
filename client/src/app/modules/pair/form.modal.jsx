import React from 'react';
import PropTypes from 'prop-types';
import Button from 'app/components/button/index';
import Input from 'app/components/input/index';
import pairApi from 'app/utils/api-services/pairs';
import Modal from 'app/components/modal/';
import PlusIcon from 'assets/icons/plus.svg';
import EditIcon from 'assets/icons/update.svg';
import './style.scss';

export default class PairModal extends React.Component {
    static propTypes = {
        onSubmit: PropTypes.func,
        categoryId: PropTypes.string.isRequired,
        isCreate: PropTypes.bool,
        firstLangExpression: PropTypes.string,
        secondLangExpression: PropTypes.string,
        pairId: PropTypes.string,
    }

    static defaultProps = {
        onSubmit: () => {},
        isCreate: false,
        firstLangExpression: '',
        secondLangExpression: '',
        pairId: '',
    };

    constructor(props) {
        super(props);

        this.state = {
            firstLangExpression: this.props.firstLangExpression,
            secondLangExpression: this.props.secondLangExpression,
            isModalOpen: false,
        };
    }

    onModalActionClick = async () => {
        let pair = {
            firstLangExpression: this.state.firstLangExpression,
            secondLangExpression: this.state.secondLangExpression,
            categoryId: this.props.categoryId,
            firstLang: 'en',
            secondLang: 'ru',
        };
        let result = this.props.isCreate ? await pairApi.create(pair) : await pairApi.edit(this.props.pairId, pair);

        this.props.onSubmit(result);

        this.closeModal();
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
        let { isCreate } = this.props;
        let title = isCreate ? 'Add a pair' : 'Edit the pair';
        let actionButtonTitle = isCreate ? 'Add' : 'Edit';

        return (
            <React.Fragment>
                <Modal
                    isOpen={this.state.isModalOpen}
                    onCloseClick={this.closeModal}
                    title={title}
                    onActionClick={this.onModalActionClick}
                    isActionButtonDisabled={!this.state.firstLangExpression || !this.state.secondLangExpression}
                    actionButtonTitle={actionButtonTitle}
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
                { isCreate &&
                    <Button
                        type="button"
                        onClick={this.openModal}
                        className="btn btn-primary btn--full-width"
                    >
                        <img src={PlusIcon} alt={title} />
                    </Button>
                }

                { !isCreate &&
                    <Button
                        type="button"
                        onClick={this.openModal}
                        className="btn btn-primary btn--full-width"
                    >
                        <img src={EditIcon} alt={title} />
                    </Button>
                }
            </React.Fragment>
        );
    }
}
