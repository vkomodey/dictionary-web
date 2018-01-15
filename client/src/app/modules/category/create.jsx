import React from 'react';
import { connect } from 'react-redux';
import Button from 'app/components/button';
import Input from 'app/components/input';
import { createCategory, checkActiveCategory } from 'app/redux/actions/categories';

class CreateCategory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
        };
    }

    createCategory = (e) => {
        e.preventDefault();

        this.props.createCategory({
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
            <div className='create-category'>
                <div className='create-category__title'>
                    <span>  Category </span>
                </div>
                <form className='create-category__form'>
                    <div className='create-category__inputs-group'>
                        <div className='create-category__inputs-group__item'>
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
                        onClick={this.createCategory}
                        disabled={!this.state.name}
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
        createCategory: (category={}) => dispatch(createCategory(category)),
        chooseActive: id => dispatch(checkActiveCategory(id)),
    }
}

export default connect(null, mapDispatchToProps)(CreateCategory);
