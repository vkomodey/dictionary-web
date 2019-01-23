import React from 'react';
import PropTypes from 'prop-types';
import CheckIcon from 'assets/icons/check.svg';
import ErrorIcon from 'assets/icons/error.svg';

export default function MatchedList(props) {
    let answeredPairs = props.pairs.filter(p => p.answered);
    let pairsView = answeredPairs.map(p => (
        <tr key={p.id}>
            <td> {p.firstLangExpression} </td>
            <td> {p.secondLangExpression} </td>
            <td> {p.answer} </td>
            <td>
                <img src={p.isAnswerRight ? CheckIcon : ErrorIcon} alt="" />
            </td>
        </tr>
    ));

    return (
        <table className="tbl testing__answers">
            <thead>
                <tr>
                    <th>English</th>
                    <th>Russian</th>
                    <th>Answer</th>
                    <th>Result</th>
                </tr>
            </thead>
            <tbody>
                {answeredPairs.length > 0 ? pairsView : <tr><td colSpan="4"> No answers </td></tr>}
            </tbody>
        </table>
    );
}

MatchedList.propTypes = {
    pairs: PropTypes.arrayOf(PropTypes.shape({
        firstLangExpression: PropTypes.string.required,
        secondLangExpression: PropTypes.string.required,
        answer: PropTypes.string.required,
        isAnswerRight: PropTypes.string.required,
        answered: PropTypes.string.required,
        id: PropTypes.string.required,
    })),
};

MatchedList.defaultProps = {
    pairs: [],
};
