import React from 'react';

export default class Button extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <input
                type='text'
                {...this.props}
            />
        );
    }
}
