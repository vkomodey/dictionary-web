import React from 'react';
import { connect } from 'react-redux';
import PairItem from './pair.item';
import { fetchPairs } from 'app/redux/actions/pairs';

class PairsListing extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.retrievePairs();
    }

    render() {
        let { pairs } = this.props;
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

function mapStateToProps(state) {
    return {
        pairs: state.pairs,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        retrievePairs: () => dispatch(fetchPairs()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PairsListing);
