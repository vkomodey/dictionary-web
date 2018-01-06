import React from 'react';
import { connect } from 'react-redux';
import Button from 'app/components/button';
import Input from 'app/components/input';
import { createCategory } from 'app/redux/actions/categories';

class CreateCategory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
        };
    }

    onClick = (e) => {
        e.preventDefault();

        this.props.onClick({
            name: this.state.name,
            firstLang: 'en',
            secondLang: 'ru',
        });

        this.clearInputs();
    }

    handleChange = (e) => {
        this.setState({
            name: e.target.value,
        });
    }

    clearInputs() {
        this.setState({
            name: '',
        });
    }

    render() {
        return (
            <div className='create-pair'>
                <div className='create-pair__title'>
                    <span> Add category </span>
                </div>
                <form>
                    <div className='create-pair__inputs-group'>
                        <div className='create-pair__inputs-group__item'>
                            <Input 
                                type='text'
                                placeholder='Category Name'
                                value={this.state.name}
                                onChange={this.handleChange}
                            />
                        </div>
                    </div>
                    <Button 
                        type='submit'
                        onClick={this.onClick}
                    >
                        Add 
                    </Button>
                </form>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        onClick: (category={}) => {
            return dispatch(createCategory(category));
        }
    }
}

export default connect(null, mapDispatchToProps)(CreateCategory);
