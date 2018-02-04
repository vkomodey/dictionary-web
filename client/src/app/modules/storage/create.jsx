import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as AppActions from 'app/redux/actions/app';
import Button from 'app/components/button';
import Input from 'app/components/input';
import pairApi from 'app/utils/api-services/pairs';

class CreatePair extends React.Component {
    static propTypes = {
        onAdded: PropTypes.func,
        activeCategoryId: PropTypes.string.isRequired,
        loading: PropTypes.func.isRequired,
    }

    static defaultProps = {
        onAdded: () => {},
    };

    constructor(props) {
        super(props);
        this.state = {
            firstLangExpression: '',
            secondLangExpression: '',
        };
    }

    onClick = (e) => {
        let { loading } = this.props;
        let pair = {
            firstLangExpression: this.state.firstLangExpression,
            secondLangExpression: this.state.secondLangExpression,
            categoryId: this.props.activeCategoryId,
            firstLang: 'en',
            secondLang: 'ru',
        };

        e.preventDefault();

        loading(true);

        return pairApi.create(pair)
            .then((added) => {
                this.props.onAdded(added);
                this.clearInputs();

                loading(false);
            })
            .catch((err) => {
                console.error(err); // eslint-disable-line

                loading(false);
            });
    }

    clearInputs = () => {
        this.setState({
            firstLangExpression: '',
            secondLangExpression: '',
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
            <div className="create-pair">
                <div className="create-pair__title">
                    <span> Pair </span>
                </div>
                <form className="create-pair__form">
                    <div className="create-pair__inputs-group">
                        <div className="create-pair__inputs-group__item">
                            <Input
                                type="text"
                                placeholder="en"
                                value={this.state.firstLangExpression}
                                onChange={this.handleChange('en')}
                                className="inpt"
                                autoFocus
                            />
                        </div>
                        <div className="create-pair__inputs-group__item">
                            <Input
                                type="text"
                                placeholder="ru"
                                value={this.state.secondLangExpression}
                                onChange={this.handleChange('ru')}
                                className="inpt"
                            />
                        </div>
                    </div>
                    <div>
                        <Button
                            type="submit"
                            onClick={this.onClick}
                            disabled={!this.state.firstLangExpression || !this.state.secondLangExpression}
                            className="btn btn-primary"
                        >
                            Add
                        </Button>
                    </div>
                </form>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { activeCategoryId: state.activeCategoryId };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(AppActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CreatePair);
