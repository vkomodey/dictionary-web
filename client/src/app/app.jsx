import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import Header from 'app/modules/header';
import StoragePage from 'app/modules/storage/index';
import TestPage from 'app/modules/test';
import Navbar from 'app/modules/header/navbar';
import Loader from 'app/components/loader';

function mapStateToProps({ isLoading }) {
    return {
        isLoading,
    };
}

@connect(mapStateToProps)
export default class App extends React.Component {
    static propTypes = {
        isLoading: PropTypes.bool,
    }

    static defaultProps = {
        isLoading: false,
    }

    render() {
        return (
            <Router>
                <div>
                    <Loader loading={this.props.isLoading} />
                    <Header />
                    <Navbar />
                    <Route exact path="/" component={StoragePage} />
                    <Route path="/test" component={TestPage} />
                </div>
            </Router>
        );
    }
}
