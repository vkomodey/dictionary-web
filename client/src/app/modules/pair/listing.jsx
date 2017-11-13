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
                <li key={p._id}>
                    <PairItem
                        firstValue={p.firstLangExpression}
                        secondValue={p.secondLangExpression}
                    />
                </li>
        ));
        return (
            <ul>
                {pairsList}
            </ul>
        );
    }
}
