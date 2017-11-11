import React, { Component } from 'react';
import PairListing from 'app/modules/pair/listing';
import httpService from 'app/utils/api-services/pairs';

export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: 'asd',
        };
    }
    render() {
        return (
            <PairListing />
        );
    }
}
