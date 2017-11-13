import React from 'react';
import Listing from './listing';
import CreatePair from './create';

export default class PairsPage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="pair-page">
                <div className="pair-page__section">
                    <CreatePair />
                </div>

                <div className="pair-page__section">
                    <Listing />
                </div>
            </div>
        );
    }
}
