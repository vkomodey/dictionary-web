import React from 'react';
import PairItem from './pair.item';
import apiPair from 'app/utils/api-services/pairs';

export default class extends React.Component {
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
        let { pairs } = this.state;
        let pairsList = pairs.map(p => (
                <tr key={p._id}>
                    <td> {p.firstLangExpression} </td>
                    <td> {p.secondLangExpression} </td>
                </tr>
        ));
        return (
            <table>
                <thead>
                    <tr>
                        <th>English</th>
                    </tr>
                    <tr>
                        <th>Russian</th>
                    </tr>
                </thead>
                <tbody>
                    {pairsList}
                </tbody>
            </table>
        );
    }
}
