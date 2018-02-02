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
        this.key = '_id';
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

    checkAll = () => {
        let checkedKeys = Object.keys(this.state.checkedKeyMap);
        let allUnchecked = checkedKeys.filter(key => this.state.checkedKeyMap[key]).length === 0;
        let checkValue = allUnchecked;
        let keyMap = {};

        this.props.pairs.forEach(p => keyMap[p[this.key]] = checkValue);

        this.setState({
            checkedKeyMap: keyMap,
        });
    }

    onChecked = (pairId) => {
        return (e) => {
            let { pairs } = this.props;
            let { checkedKeyMap, lastSelectedKey } = this.state;
            let checkedIndex = pairs.findIndex(p => p[this.key] === pairId);
            let lastIndex = pairs.findIndex(p => p[this.key] === lastSelectedKey);
            let checkValue = !Boolean(checkedKeyMap[pairId]);
            let newCheckedKeyMap = {
                [pairId]: checkValue,
            };

            // In case user has not checked anything, we should consider last selected index 
            // as a first element
            if ( lastIndex < 0) {
                lastIndex = 0;
            }

            if ( e.nativeEvent.shiftKey ) {
                let startIndex = Math.min(checkedIndex, lastIndex);
                let endIndex = Math.max(checkedIndex, lastIndex);

                for ( let i = startIndex; i <= endIndex; ++i ) {
                    // Fill all with the opposite of current check value
                    let id = pairs[i][this.key];
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
        let checkedKeys = Object.keys(this.state.checkedKeyMap);
        let { pairs } = this.props;
        let allUnchecked = checkedKeys.filter(key => this.state.checkedKeyMap[key]).length === 0;
        let { lastSelectedKey } = this.state;
        let pairsList = pairs.map(p => {
            let pairId = p[this.key];
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
                        <th>
                            <Checkbox
                                onChange={this.checkAll}
                                checked={!allUnchecked}
                                uniqValue={'all'}
                            />
                        </th>
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
