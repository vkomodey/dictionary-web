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

        return this.props.onClick({
            firstLangExpression: this.state.firstLangExpression,
            secondLangExpression: this.state.secondLangExpression,
            firstLang: 'en',
            secondLang: 'ru',
        });
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

    render() {
        return (
            <div className='create-pair'>
                <div className='create-pair__title'>
                    <span> Enter your pair </span>
                </div>
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
                <Button 
                    type='button'
                    onClick={this.onClick}
                >
                    Create 
                </Button>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        onClick: (pair={}) => {
            return dispatch(createPair(pair));
        }
    }
}

export default connect(null, mapDispatchToProps)(CreatePair);
