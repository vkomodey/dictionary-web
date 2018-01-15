import React from 'react';
import { connect } from 'react-redux';
import Button from 'app/components/button';
import Input from 'app/components/input';
import { createPair } from 'app/redux/actions/pairs';

class CreatePair extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstLangExpression: '',
            secondLangExpression: '',
        };
    }

    onClick = (e) => {
        e.preventDefault();

        this.props.onClick({
            firstLangExpression: this.state.firstLangExpression,
            secondLangExpression: this.state.secondLangExpression,
            categoryId: this.props.activeCategoryId,
            firstLang: 'en',
            secondLang: 'ru',
        });

        this.clearInputs();
    }

    handleChange = (inputType) => {
        return e => {
            let { firstLangExpression, secondLangExpression } = this.state;
            this.setState({
                firstLangExpression: inputType === 'en' ? e.target.value : firstLangExpression,
                secondLangExpression: inputType === 'ru' ? e.target.value : secondLangExpression,
            });
        }
    }

    areInputsEmpty = () => {
        let { firstLangExpression, secondLangExpression } = this.state;

        return !firstLangExpression && !secondLangExpression;
    }

    clearInputs() {
        this.setState({
            firstLangExpression: '',
            secondLangExpression: '',
        });
    }

    render() {
        return (
            <div className='create-pair'>
                <div className='create-pair__title'>
                    <span> Pair </span>
                </div>
                <form className="create-pair__form">
                    <div className='create-pair__inputs-group'>
                        <div className='create-pair__inputs-group__item'>
                            <Input 
                                type='text'
                                placeholder='en'
                                value={this.state.firstLangExpression}
                                onChange={this.handleChange('en')}
                            />
                        </div>
                        <div className='create-pair__inputs-group__item'>
                            <Input 
                                type='text' 
                                placeholder='ru'
                                value={this.state.secondLangExpression}
                                onChange={this.handleChange('ru')}
                            />
                        </div>
                    </div>
                    <div>
                        <Button 
                            type='submit'
                            onClick={this.onClick}
                            disabled={this.areInputsEmpty()}
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
    return {
        activeCategoryId: state.activeCategoryId,
    };
};

function mapDispatchToProps(dispatch) {
    return {
        onClick: (pair={}) => {
            return dispatch(createPair(pair));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreatePair);
