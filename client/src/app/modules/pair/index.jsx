import React from 'react';
import Listing from './listing';
import CreatePair from './create';
import noCategoryHoc from './../no-category.hoc';

export default function PairsPage(props) {
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
