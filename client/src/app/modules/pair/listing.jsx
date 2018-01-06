import React from 'react';
import { connect } from 'react-redux';
import { removePair } from 'app/redux/actions/pairs';
import Button from 'app/components/button';

class PairsListing extends React.Component {
    constructor(props) {
        super(props);
    }

    onRemoveClick = id => {
        return e => {
            e.preventDefault();

            return this.props.removePair(id);
        }
    }

    render() {
        let { pairs } = this.props;
        let pairsList = pairs.map(p => (
            <tr key={p._id}>
                <td> {p.firstLangExpression} </td>
                <td> {p.secondLangExpression} </td>
                <td> 
                    <Button
                        type='button'
                        onClick={this.onRemoveClick(p._id)}
                    >
                        x
                    </Button>
                </td>
            </tr>
        ));

        return (
            <table>
                <thead>
                    <tr>
                        <th>English</th>
                        <th>Russian</th>
                        <th>Remove</th>
                    </tr>
                </thead>
                <tbody>
                    {pairsList.length > 0 ? pairsList : <tr><td colSpan='3'> No pairs found! </td></tr>}
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
        removePair: id => dispatch(removePair(id)), 
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PairsListing);
