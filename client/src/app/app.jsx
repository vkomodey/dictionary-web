import React from 'react';
import Header from 'app/modules/header';
import PairPage from 'app/modules/pair';
import TestPage from 'app/modules/test';
import Navbar from 'app/modules/header/navbar';
import { BrowserRouter as Router, Route } from 'react-router-dom';

export default function App() {
    return (
            <Router>
                <div>
                    <Header />
                    <Navbar />
                    <Route exact path="/" component={PairPage} />
                    <Route path="/test" component={TestPage} />
                </div>
            </Router>
    );
}
