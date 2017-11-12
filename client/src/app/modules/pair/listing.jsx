import React, {Component} from 'react';
import apiPair from 'app/utils/api-services/pairs';

import ReactTable from 'react-table';
import "react-table/react-table.css";

let columns = [
    {
        Header: "First Language",
        accessor: "firstLangExpression",
    },
    {
        Header: "Second Language",
        accessor: "secondLangExpression",
    }
];

export default class extends Component {
    constructor(props) {
        super(props);

        this.state = {
            pairs: [],
        };
    }

    componentWillMount() {
        apiPair.findAll()
            .then(pairs => {
                this.setState({pairs});
            });
    }

    render() {
        return (
            <ReactTable
                columns={columns}
                data={this.state.pairs}
            />
        );
    }
}
