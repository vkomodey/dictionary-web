import React from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Pairs from 'app/modules/pair/index';
import ActiveCategories from './active.widgets';

@DragDropContext(HTML5Backend)
export default class Storage extends React.Component {
    render() {
        return (
            <div className="storage-container">
                <Pairs />
                <ActiveCategories />
            </div>
        );
    }
}
