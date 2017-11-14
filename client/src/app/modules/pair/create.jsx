import React from 'react';
import Button from 'app/components/button';
import Input from 'app/components/input';

export default class CreatePair extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="create-pair">
                <div className="create-pair__title">
                    <span> Enter your pair </span>
                </div>
                <div className="create-pair__inputs-group">
                    <div className="create-pair__inputs-group__item">
                        <Input type="text" placeholder="en"/>
                    </div>
                    <div className="create-pair__inputs-group__item">
                        <Input type="text" placeholder="ru"/>
                    </div>
                </div>
                <Button type="button"> Create </Button>
            </div>
        );
    }
}
