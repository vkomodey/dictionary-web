import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Input from 'app/components/input';
import Button from 'app/components/button';
import { shuffle } from 'app/utils/array';
import CheckIcon from 'assets/icons/check.svg';
import ErrorIcon from 'assets/icons/error.svg';
import { loading } from 'app/redux/actions/app';
import pairApi from 'app/utils/api-services/pairs';
import MatchedList from './answers';

const START = 'start';
const FINISH = 'finish';

function isMatch(value1 = '', value2 = '') {
    let cleared1 = value1.trim().toLowerCase();
    let cleared2 = value2.trim().toLowerCase();

    return cleared1 === cleared2;
}

class Test extends React.Component {
    static propTypes = {
        activeCategoryId: PropTypes.string.isRequired,
        loading: PropTypes.func.isRequired,
    }

    constructor(props) {
        super(props);

        this.state = {
            answer: '',
            currentPairIndex: 0,
            finished: false,
            inProgress: false,
            rightLen: 0,
            pairs: [],
        };
    }

    componentDidMount() {
        this.fetchPairs(this.props.activeCategoryId);
    }

    componentWillReceiveProps(nextProps) {
        if ( this.props.activeCategoryId !== nextProps.activeCategoryId ) {
            this.fetchPairs(nextProps.activeCategoryId)
                .then(this.resetTestActivities);
        }
    }

    resetTestActivities = () => {
        this.setState({
            answer: '',
            currentPairIndex: 0,
            finished: false,
            inProgress: false,
            rightLen: 0,
        });
    }

    fetchPairs = (categoryId) => {
        this.props.loading(true);

        return pairApi.findAll({ categoryId })
            .then((pairs) => {
                this.setState({ pairs });
                this.props.loading(false);
            })
            .catch((err) => {
                console.error(err); //eslint-disable-line

                this.props.loading(false);
            });
    }

    handleStartFinish = actionType =>
        (e) => {
            e.preventDefault();

            if ( actionType === START) {
                this.setState({
                    inProgress: true,
                    rightLen: 0,
                    currentPairIndex: 0,
                    finished: false,
                    pairs: shuffle(this.state.pairs).map(p => Object.assign({ answered: false }, p)),
                });
            } else if ( actionType === FINISH ) {
                this.setState({
                    inProgress: false,
                    finished: true,
                    answer: '',
                });
            }
        }

    handleAnswerChange = (e) => {
        this.setState({
            answer: e.target.value,
        });
    }

    submitAnswer = (e) => {
        let {
            currentPairIndex,
            answer,
            rightLen,
            pairs,
        } = this.state;
        let currentPair = pairs[currentPairIndex];
        let isAnswerRight = isMatch(answer, currentPair.firstLangExpression);
        let newIndex = currentPairIndex + 1;
        let isTestFinished = newIndex > pairs.length - 1;
        let newPairs = [
            Object.assign({}, currentPair, {
                isAnswerRight,
                answer,
                answered: true,
            }),
            ...pairs.slice(0, currentPairIndex),
            ...pairs.slice(currentPairIndex + 1, pairs.length),
        ];

        e.preventDefault();

        this.setState({
            answer: '',
            currentPairIndex: newIndex,
            rightLen: isAnswerRight ? rightLen + 1 : rightLen,
            finished: isTestFinished,
            inProgress: !isTestFinished,
            pairs: newPairs,
        });
    }

    render() {
        let {
            rightLen,
            currentPairIndex,
            inProgress,
            finished,
            pairs,
        } = this.state;
        let currentPair = pairs[currentPairIndex];

        return (
            <div className="testing">
                <div className="testing__control-panel">
                    { !inProgress &&
                        <Button
                            disabled={pairs.length === 0}
                            onClick={this.handleStartFinish(START)}
                            className="btn btn-primary"
                        >
                            Start
                        </Button>
                    }
                    { pairs.length === 0 &&
                        <div><span>No pairs found</span></div>
                    }
                </div>

                { inProgress &&
                    <div>
                        <form className="testing__work-section" >
                            <span> { currentPair.secondLangExpression } </span>
                            <Input
                                type="text"
                                value={this.state.answer}
                                onChange={this.handleAnswerChange}
                                className="inpt testing__work-section__input"
                                autoFocus
                            />
                            <Button
                                className="btn btn-primary"
                                type="submit"
                                onClick={this.submitAnswer}
                            >
                                Answer
                            </Button>
                            <Button
                                className="btn btn-danger"
                                onClick={this.handleStartFinish(FINISH)}
                            > END
                            </Button>
                        </form>
                    </div>
                }
                { finished &&
                    <div>
                        <div className="testing__progress-bar">
                            <div className="testing__progress-bar__entry">
                                <img
                                    src={CheckIcon}
                                    alt="Right"
                                />
                                <span>{ rightLen }</span>
                                <img
                                    src={ErrorIcon}
                                    alt="Wrong"
                                />
                                <span>{ pairs.length - rightLen }</span>
                            </div>
                        </div>
                    </div>
                }
                <MatchedList pairs={pairs} />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        activeCategoryId: state.activeCategoryId,
    };
}
function mapDispatchToProps(dispatch) {
    return {
        loading: value => dispatch(loading(value)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Test);
