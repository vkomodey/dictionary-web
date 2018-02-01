import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { removePair } from 'app/redux/actions/pairs';
import Button from 'app/components/button';
import Checkbox from 'app/components/checkbox/index';
import DeleteIcon from 'assets/icons/delete.svg';

class PairsListing extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checkedKeyMap: {},
            lastSelectedKey: null,
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
            let { pairs } = this.props;
            let { checkedKeyMap, lastSelectedKey } = this.state;
            let key = '_id';
            let checkedIndex = pairs.findIndex(p => p[key] === pairId);
            let lastIndex = pairs.findIndex(p => p[key] === lastSelectedKey) || 0;
            let checkValue = !Boolean(checkedKeyMap[pairId]);
            let newCheckedKeyMap = {
                [pairId]: checkValue,
            };

            if ( e.nativeEvent.shiftKey ) {
                let startIndex = Math.min(checkedIndex, lastIndex);
                let endIndex = Math.max(checkedIndex, lastIndex);

                for ( let i = startIndex; i <= endIndex; ++i ) {
                    let id = pairs[i]._id;
                    if ( checkedKeyMap[id] === checkValue && i !== checkedIndex ) {
                        lastIndex = i;
                    }
                }

                startIndex = Math.min(checkedIndex, lastIndex);
                endIndex = Math.max(checkedIndex, lastIndex);

                for ( let i = startIndex; i <= endIndex; ++i ) {
                    // Fill all opposite of current check value
                    let id = pairs[i][key];
                    newCheckedKeyMap[id] = checkValue;
                }
            }

            this.setState({
                checkedKeyMap: { ...checkedKeyMap, ...newCheckedKeyMap },
                lastSelectedKey: pairId,
            });
        };
    }

    render() {
        let { pairs } = this.props;
        let { lastSelectedKey } = this.state;
        let pairsList = pairs.map(p => {
            let pairId = p._id;
            let rowClass = this.state.checkedKeyMap[pairId] ? 'selected' : '';

            return (
                <tr key={pairId} className={rowClass} >
                    <td>
                        <Checkbox
                            onChange={this.onChecked(pairId)}
                            checked={Boolean(this.state.checkedKeyMap[pairId])}
                            selected={pairId === lastSelectedKey}
                            uniqValue={pairId}
                        />
                    </td>
                    <td onClick={this.onChecked(pairId)}> {p.firstLangExpression} </td>
                    <td onClick={this.onChecked(pairId)}> {p.secondLangExpression} </td>
                    <td> 
                        <Button
                            type='button'
                            onClick={this.onRemoveClick(pairId)}
                            className='btn btn-danger'
                        >
                            <img src={DeleteIcon} />
                        </Button>
                    </td>
                </tr>
            );
        });

        return (
            <table className='tbl pair-listing'>
                <thead>
                    <tr>
                        <th />
                        <th>English</th>
                        <th>Russian</th>
                        <th></th>
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
