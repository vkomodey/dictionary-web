import React from 'react';
import { connect } from 'react-redux';
import Input from 'app/components/input';
import Button from 'app/components/button';
import MatchedList from './answers';
import { shuffle } from 'app/utils/array';
const START = 'start'; const FINISH = 'finish';

class Test extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            answer: '',
            currentPairIndex: 0,
            finished: false,
            inProgress: false,
            rightLen: 0,
            wrongLen: 0,
            pairs: [],
        };
    }

    handleStartFinish = (actionType) => {
        return (e) => {
            e.preventDefault();

            if ( actionType === START) {
                this.setState({
                    inProgress: true,
                    rightLen: 0,
                    wrongLen: 0,
                    currentPairIndex: 0,
                    finished: false,
                    pairs: shuffle(this.props.pairs).map(p => Object.assign({answered: false}, p)),
                });
            } else if ( actionType === FINISH ) {
                this.setState({
                    inProgress: false,
                    finished: true,
                    answer: '',
                });
            }
        }
    }

    handleAnswerChange = (e) => {
        this.setState({
            answer: e.target.value,
        });
    }

    submitAnswer = (e) => {
        let { currentPairIndex, answer, rightLen, wrongLen, pairs } = this.state;
        let currentPair = pairs[currentPairIndex];
        let isAnswerRight = answer === currentPair.firstLangExpression;
        let newIndex = currentPairIndex + 1;
        let isTestFinished = newIndex > pairs.length - 1; 
        let newPairs = [
            Object.assign({}, currentPair, {
                isAnswerRight,
                answer,
                answered: true,
            }),
            ...pairs.slice(0, currentPairIndex),
            ...pairs.slice(currentPairIndex + 1, pairs.length)
        ];


        e.preventDefault();

        this.setState({
            answer: '',
            currentPairIndex: newIndex,
            rightLen: isAnswerRight ? rightLen + 1 : rightLen,
            wrongLen: !isAnswerRight ? wrongLen + 1 : wrongLen,
            finished: isTestFinished,
            inProgress: !isTestFinished,
            pairs: newPairs,
        });
    }

    render() {
        let { testPairs, rightLen, wrongLen, currentPairIndex, inProgress, finished, pairs } = this.state;
        let currentPair = pairs[currentPairIndex];

        return (
            <div className="testing">
                <div className="testing__control-panel">
                    { !this.state.inProgress &&
                        <Button disabled={this.props.pairs.length === 0} onClick={this.handleStartFinish(START)} > Start </Button>
                    }
                    { this.props.pairs.length === 0 && 
                            <div><span>No pairs found</span></div>
                    }
                </div>

                { this.state.inProgress && 
                    <div>
                        <form className="testing__work-section" >
                            <span> { currentPair.secondLangExpression } </span>
                            <Input
                                type='text'
                                value={this.state.answer}
                                onChange={this.handleAnswerChange}
                                className="testing__work-section__input"
                            />
                            <Button
                                type='submit'
                                onClick={this.submitAnswer}
                                disabled={!this.state.answer}
                            >
                                Answer
                            </Button>
                            <Button onClick={this.handleStartFinish(FINISH)} > END </Button>
                        </form>
                            
                    </div>
                }
                { this.state.finished &&
                    <div>
                        <div className="testing__progress-bar">
                            <div>
                                <span>Right: { rightLen }</span>
                            </div>
                            <div>
                                <span>Wrong: { wrongLen }</span>
                            </div>
                        </div>
                    </div>
                }
                <MatchedList pairs={this.state.pairs}/>
            </div>
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
        findPairs: () => dispatch(fetchPairs()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Test);
