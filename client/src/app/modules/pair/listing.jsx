import React, {Component} from 'react';
import apiPair from 'app/utils/api-services/pairs';

export default class extends Component {
    constructor(props) {
        super(props);

        this.state = {
            pairs: [],
        };
    }

    componentDidMount() {
        apiPair.findAll()
            .then(pairs => {
                this.setState({pairs});
            });
    }

    render() {
        let { pairs } = this.state;
        return (
            pairs.map(p => (<div key={p._id}> {p.firstLangExpression} </div>))
        );
    }
}
