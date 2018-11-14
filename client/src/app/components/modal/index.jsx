import React from 'react';
import ReactModal from 'react-modal';
import PropTypes from 'prop-types';
import Button from 'app/components/button/';
import './style.scss';

ReactModal.setAppElement('#root');

// eslint-disable-next-line
export default class Modal extends React.Component {
    static propTypes = {
        children: PropTypes.oneOfType([
            PropTypes.element,
            PropTypes.object,
            PropTypes.string,
        ]),
        onCloseClick: PropTypes.func,
        title: PropTypes.string,
        actionButtonTitle: PropTypes.string,
        onActionClick: PropTypes.func,
        isActionButtonDisabled: PropTypes.bool,
    }

    static defaultProps = {
        children: <span />,
        onCloseClick: () => {},
        onActionClick: () => {},
        actionButtonTitle: 'Submit',
        isActionButtonDisabled: false,
        title: '',
    }

    render() {
        return (
            <ReactModal
                className="modal-window"
                overlayClassName="modal-overlay"
                shouldCloseOnOverlayClick
                onRequestClose={this.props.onCloseClick}
                {...this.props}
            >
                <div className="modal-container">
                    <div className="modal-container__title">
                        <div className="modal-container__title-label">
                            <span>
                                {this.props.title}
                            </span>
                        </div>
                        <div className="modal-container__title-button">
                            <Button
                                className="btn btn-primary"
                                onClick={this.props.onCloseClick}
                            >
                                X
                            </Button>
                        </div>

                    </div>

                    <div className="modal-container__content">
                        {this.props.children}
                    </div>

                    <div className="modal-container__footer">
                        <Button
                            className="btn btn-primary"
                            onClick={() => this.props.onActionClick()}
                            disabled={this.props.isActionButtonDisabled}
                        >
                            {this.props.actionButtonTitle}
                        </Button>
                        <Button
                            className="btn btn-primary"
                            onClick={this.props.onCloseClick}
                        >
                            Cancel
                        </Button>
                    </div>
                </div>
            </ReactModal>
        );
    }
}
