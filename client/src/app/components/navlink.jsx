import React from 'react';
import { Link } from 'react-router-dom';
import Button from './button';

export default class Navlink extends React.Component {
    onButtonClick = (e) => {
        this.linkElem.handleClick(e);
    }
    render() {
        return (
            <Button
                className='btn btn-primary'
                onClick={this.onButtonClick}
            >
                <Link 
                    className='nav-link'
                    {...this.props}
                    ref={(linkElem => this.linkElem = linkElem)}
                >
                    {this.props.children}
                </Link>
            </Button>
        );
    }
}
