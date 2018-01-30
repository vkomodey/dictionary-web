import React from 'react';
import { connect } from 'react-redux';
import { removePair } from 'app/redux/actions/pairs';
import Button from 'app/components/button';
import Checkbox from 'app/components/checkbox/index';
import DeleteIcon from 'assets/icons/delete.svg';

class PairsListing extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: {},
        };
    }

    onRemoveClick = id => {
        return e => {
            e.preventDefault();

            return this.props.removePair(id);
        }
    }

    onChecked = (pairId) => {
        return (e) => {
            let previousChecked = Boolean(this.state.checked[pairId]);

            this.setState({
                checked: {
                    ...this.state.checked,
                    [pairId]: !previousChecked,
                }
            });
        };
    }

    render() {
        let { pairs } = this.props;
        let pairsList = pairs.map(p => (
            <tr key={p._id}>
                <th>
                    <Checkbox
                        className='ccc'
                        checked={this.state.checked[p._id]}
                        onChange={this.onChecked(p._id)}
                        uniqValue={p._id}
                    />
                </th>
                <td> {p.firstLangExpression} </td>
                <td> {p.secondLangExpression} </td>
                <td> 
                    <Button
                        type='button'
                        onClick={this.onRemoveClick(p._id)}
                        className='btn btn-danger'
                    >
                        <img src={DeleteIcon} />
                    </Button>
                </td>
            </tr>
        ));

        return (
            <table className='tbl pair-listing'>
                <thead>
                    <tr>
                        <th />
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
