import React from 'react';
import { connect } from 'react-redux';
import { fetchPairs } from 'app/redux/actions/pairs';
import Input from 'app/components/input';
import Button from 'app/components/button';
import { shuffle } from 'app/utils/array';

const START = 'start';
const FINISH = 'finish';

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

    componentWillMount() {
        this.props.findPairs()
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
                    pairs: shuffle(this.props.pairs),
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
        let currentIndex = currentPairIndex + 1;
        let isTestFinished = currentIndex > pairs.length - 1;

        e.preventDefault();

        this.setState({
            answer: '',
            currentPairIndex: currentIndex,
            rightLen: isAnswerRight ? rightLen + 1 : rightLen,
            wrongLen: !isAnswerRight ? wrongLen + 1 : wrongLen,
            finished: isTestFinished,
            inProgress: !isTestFinished,
        });
    }

    render() {
        let { testPairs, rightLen, wrongLen, currentPairIndex, inProgress, finished, pairs } = this.state;
        let currentPair = pairs[currentPairIndex];

        return (
            <div className="testing">
                <div className="testing__control-panel">
                    { !this.state.inProgress &&
                        <Button onClick={this.handleStartFinish(START)} > Start </Button>
                    }
                    { this.state.inProgress &&
                        <Button onClick={this.handleStartFinish(FINISH)} > END </Button>
                    }
                </div>

                { this.state.inProgress && 
                    <div className="testing__work-section">
                        <form>
                            <span> { currentPair.secondLangExpression } </span>
                            <Input
                                type='text'
                                value={this.state.answer}
                                onChange={this.handleAnswerChange}
                            />
                            <Button
                                type='submit'
                                onClick={this.submitAnswer}
                            >
                                Answer
                            </Button>
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
