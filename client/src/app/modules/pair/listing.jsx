import React from 'react';
import PropTypes from 'prop-types';
import Button from 'app/components/button';
import Checkbox from 'app/components/checkbox/index';
import DeleteIcon from 'assets/icons/delete.svg';

export default class PairsListing extends React.Component {
    static propTypes = {
        pairs: PropTypes.arrayOf(PropTypes.shape({
            firstLangExpression: PropTypes.string,
            secondLangExpression: PropTypes.string,
        })),
        onRemove: PropTypes.func,
        uniqKey: PropTypes.string.isRequired,
    }

    static defaultProps = {
        pairs: [],
        onRemove: () => {},
    }

    constructor(props) {
        super(props);
        this.state = {
            checkedKeyMap: {},
            lastSelectedKey: null,
        };
    }

    componentWillReceiveProps(nextProps) {
        if ( nextProps.pairs.length !== this.props.pairs.length ) {
            this.setState({
                checkedKeyMap: {},
                lastSelectedKey: null,
            });
        }
    }

    onRemoveClick = id => (e) => {
        e.preventDefault();

        this.props.onRemove(id);
    }

    onChecked = pairId => (e) => {
        let { pairs, uniqKey } = this.props;
        let { checkedKeyMap, lastSelectedKey } = this.state;
        let checkedIndex = pairs.findIndex(p => p[uniqKey] === pairId);
        let lastIndex = pairs.findIndex(p => p[uniqKey] === lastSelectedKey);
        let checked = !checkedKeyMap[pairId];
        let newCheckedKeyMap = {
            [pairId]: checked,
        };

        // In case user has not checked anything, we should consider last selected index as a first element
        if ( lastIndex < 0) {
            lastIndex = 0;
        }

        if ( e.nativeEvent.shiftKey ) {
            let startIndex = Math.min(checkedIndex, lastIndex);
            let endIndex = Math.max(checkedIndex, lastIndex);

            for ( let i = startIndex; i <= endIndex; i += 1 ) {
                let id = pairs[i][uniqKey];

                newCheckedKeyMap[id] = checked;
            }
        }

        this.setState({
            checkedKeyMap: { ...checkedKeyMap, ...newCheckedKeyMap },
            lastSelectedKey: pairId,
        });
    }

    checkAll = () => {
        let { uniqKey } = this.props;
        let checkedKeys = Object.keys(this.state.checkedKeyMap);
        let areAllUnchecked = checkedKeys.filter(key => this.state.checkedKeyMap[key]).length === 0;
        let globalCheckValue = areAllUnchecked;
        let keyMap = {};

        this.props.pairs.forEach((p) => {
            keyMap[p[uniqKey]] = globalCheckValue;
        });

        this.setState({
            checkedKeyMap: keyMap,
        });
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
                        type="button"
                        onClick={this.onRemoveClick(entityKey)}
                        className="btn btn-danger"
                    >
                        <img src={DeleteIcon} alt="Delete pair" />
                    </Button>
                </td>
            </tr>
        );
    }

    render() {
        let checkedKeys = Object.keys(this.state.checkedKeyMap);
        let { pairs } = this.props;
        let allUnchecked = checkedKeys.filter(key => this.state.checkedKeyMap[key]).length === 0;
        let pairsList = pairs.map(this.renderRow);

        return (
            <div>
                { !allUnchecked &&
                <div className="actions">
                    <Button
                        type="button"
                        onClick={this.onRemoveClick(checkedKeys)}
                        className="btn btn-danger"
                    >
                        Remove
                    </Button>
                </div>
                }
                <table className="tbl pair-listing">
                    <thead>
                        <tr>
                            <th> {
                                pairs.length > 0 &&
                                <Checkbox
                                    onChange={this.checkAll}
                                    checked={!allUnchecked}
                                    uniqValue="all"
                                />
                            }
                            </th>
                            <th>English</th>
                            <th>Russian</th>
                            <th />
                        </tr>
                    </thead>
                    <tbody>
                        {pairsList.length > 0 ? pairsList : <tr><td colSpan="4"> No pairs found! </td></tr>}
                    </tbody>
                </table>
            </div>
        );
    }
}
