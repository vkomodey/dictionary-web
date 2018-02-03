import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import Button from 'app/components/button';
import Checkbox from 'app/components/checkbox/index';
import DeleteIcon from 'assets/icons/delete.svg';

export default class PairsListing extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checkedKeyMap: {},
            lastSelectedKey: null,
        };
    }

    static propTypes = {
        pairs: PropTypes.array.isRequired,
        onRemove: PropTypes.func,
        uniqKey: PropTypes.string.isRequired,
    }

    componentWillReceiveProps(nextProps) {
        if ( nextProps.pairs.length !== this.props.pairs.length ) {
            this.setState({
                checkedKeyMap: {},
                lastSelectedKey: null,
            });
        }
    }

    onRemoveClick = id => {
        return e => {
            e.preventDefault();

            this.props.onRemove(id);
        }
    }

    checkAll = () => {
        let { uniqKey } = this.props;
        let checkedKeys = Object.keys(this.state.checkedKeyMap);
        let allUnchecked = checkedKeys.filter(key => this.state.checkedKeyMap[key]).length === 0;
        let checkValue = allUnchecked;
        let keyMap = {};

        this.props.pairs.forEach(p => keyMap[p[uniqKey]] = checkValue);

        this.setState({
            checkedKeyMap: keyMap,
        });
    }

    onChecked = (pairId) => {
        return (e) => {
            let { pairs, uniqKey } = this.props;
            let { checkedKeyMap, lastSelectedKey } = this.state;
            let checkedIndex = pairs.findIndex(p => p[uniqKey] === pairId);
            let lastIndex = pairs.findIndex(p => p[uniqKey] === lastSelectedKey);
            let checkValue = !Boolean(checkedKeyMap[pairId]);
            let newCheckedKeyMap = {
                [pairId]: checkValue,
            };

            // In case user has not checked anything, we should consider last selected index as a first element
            if ( lastIndex < 0) {
                lastIndex = 0;
            }

            if ( e.nativeEvent.shiftKey ) {
                let startIndex = Math.min(checkedIndex, lastIndex);
                let endIndex = Math.max(checkedIndex, lastIndex);

                for ( let i = startIndex; i <= endIndex; ++i ) {
                    let id = pairs[i][uniqKey];
                    newCheckedKeyMap[id] = checkValue;
                }
            }

            this.setState({
                checkedKeyMap: { ...checkedKeyMap, ...newCheckedKeyMap },
                lastSelectedKey: pairId,
            });
        };
    }

    renderRow = (entity) => {
        let { checkedKeyMap, lastSelectedKey } = this.state;
        let { uniqKey } = this.props;
        let entityKey = entity[uniqKey];
        let rowClass = checkedKeyMap[entityKey] ? 'selected' : '';

        return (
            <tr key={entityKey} className={rowClass} >
                <td>
                    <Checkbox
                        onChange={this.onChecked(entityKey)}
                        checked={Boolean(checkedKeyMap[entityKey])}
                        selected={entityKey === lastSelectedKey}
                        uniqValue={entityKey}
                    />
                </td>
                <td onClick={this.onChecked(entityKey)}> {entity.firstLangExpression} </td>
                <td onClick={this.onChecked(entityKey)}> {entity.secondLangExpression} </td>
                <td> 
                    <Button
                        type='button'
                        onClick={this.onRemoveClick(entityKey)}
                        className='btn btn-danger'
                    >
                        <img src={DeleteIcon} />
                    </Button>
                </td>
            </tr>
        );
    }

    render() {
        let checkedKeys = Object.keys(this.state.checkedKeyMap);
        let { pairs, uniqKey } = this.props;
        let allUnchecked = checkedKeys.filter(key => this.state.checkedKeyMap[key]).length === 0;
        let { lastSelectedKey } = this.state;
        let pairsList = pairs.map(this.renderRow);

        return (
            <table className='tbl pair-listing'>
                <thead>
                    <tr>
                        <th> {
                            pairs.length > 0 &&
                            <Checkbox
                                onChange={this.checkAll}
                                checked={!allUnchecked}
                                uniqValue={'all'}
                            />
                        }
                        </th>
                        <th>English</th>
                        <th>Russian</th>
                        <th>{ !allUnchecked  && 
                            <Button
                                type='button'
                                onClick={this.onRemoveClick(checkedKeys)}
                                className='btn btn-danger'
                            >
                                <img src={DeleteIcon} />
                            </Button>
                        }
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {pairsList.length > 0 ? pairsList : <tr><td colSpan='4'> No pairs found! </td></tr>}
                </tbody>
            </table>
        );
    }
}
