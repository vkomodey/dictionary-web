import React from 'react';
import PropTypes from 'prop-types';
import Input from 'app/components/input/index';
import Button from 'app/components/button/index';
import { shuffle } from 'app/utils/array';
import CheckIcon from 'assets/icons/check.svg';
import ErrorIcon from 'assets/icons/error.svg';
import pairApi from 'app/utils/api-services/pairs';
import toastr from 'app/utils/toastr';
import MatchedList from './answers';
import { areEqual } from './answer.checks';

const START = 'start';
const FINISH = 'finish';

export default class Test extends React.Component {
    static propTypes = {
        categoryId: PropTypes.string.isRequired,
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
        this.fetchPairs(this.props.categoryId);
    }

    componentWillReceiveProps(nextProps) {
        if ( this.props.categoryId !== nextProps.categoryId ) {
            this.fetchPairs(nextProps.categoryId)
                .then(this.resetTestActivities);
        }
    }

    onStartFinishClick = actionType =>
        (e) => {
            e.preventDefault();

            this.handleStartFinish(actionType);
        }

    handleStartFinish = (actionType) => {
        if ( actionType === START) {
            this.setState({
                inProgress: true,
                rightLen: 0,
                currentPairIndex: 0,
                finished: false,
                pairs: shuffle(this.state.pairs).map((p) => {
                    let pair = {
                        ...p,
                        answered: false,
                    };

                    return pair;
                }),
            });
            toastr.info('Let\'s go, boy');
        } else if ( actionType === FINISH ) {
            let { rightLen } = this.state;

            if ( rightLen > this.state.pairs.length - rightLen ) {
                toastr.success('Wow! So much knowledges');
            } else {
                toastr.info('Not so impressive');
            }
            this.setState({
                inProgress: false,
                finished: true,
                answer: '',
            });
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

    fetchPairs = async (categoryId) => {
        try {
            this.setState({
                pairs: await pairApi.findAll({ categoryId }),
            });
        } catch (err) {
            this.setState({
                pairs: [],
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
        let isAnswerRight = areEqual(answer, currentPair.firstLangExpression, currentPair.firstLang);
        let newIndex = currentPairIndex + 1;
        let isTestFinished = newIndex > pairs.length - 1;
        let newPairs = [
            {
                ...currentPair,
                isAnswerRight,
                answer,
                answered: true,
            },
            ...pairs.slice(0, currentPairIndex),
            ...pairs.slice(currentPairIndex + 1, pairs.length),
        ];

        e.preventDefault();

        this.setState({
            answer: '',
            inProgress: !isTestFinished,
            finished: isTestFinished,
            currentPairIndex: newIndex,
            rightLen: isAnswerRight ? rightLen + 1 : rightLen,
            pairs: newPairs,
        }, () => {
            if ( isTestFinished) {
                this.handleStartFinish(FINISH);
            }
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
                            onClick={this.onStartFinishClick(START)}
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
                                onClick={this.onStartFinishClick(FINISH)}
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
