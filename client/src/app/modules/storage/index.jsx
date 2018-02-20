import React from 'react';
import Pairs from 'app/modules/pair/index';
import ActiveCategories from './active.widgets';

export default function Storage() {
    return (
        <div className="storage-container">
            <Pairs />
            <ActiveCategories />
        </div>
    );
}
