import React from 'react';
import CheckIcon from 'assets/icons/check.svg'; 
import ErrorIcon from 'assets/icons/error.svg'; 

export default function MatchedList(props) {
    let answeredPairs = props.pairs.filter(p => p.answer);
    let pairsView = answeredPairs.map(p => (
        <tr key={p._id}> 
            <td> {p.firstLangExpression} </td>
            <td> {p.secondLangExpression} </td>
            <td> {p.answer} </td>
            <td> 
                <img src={p.isAnswerRight ? CheckIcon : ErrorIcon} />
            </td>
        </tr>
    ));

    return (
        <table className="testing__answers">
            <thead>
                <tr>
                    <th>English</th>
                    <th>Russian</th>
                    <th>Answer</th>
                    <th>Result</th>
                </tr>
            </thead>
            <tbody>
                {answeredPairs.length > 0 ? pairsView : <tr><td colSpan='4'> No answers </td></tr>}           
            </tbody>
        </table>
    );
}
