import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import Header from 'app/modules/header';
import PairPage from 'app/modules/pair';
import CategoryPage from 'app/modules/category';
import TestPage from 'app/modules/test';
import Navbar from 'app/modules/header/navbar';
import ActiveCategory from 'app/modules/header/active-category';
import Loader from 'app/components/loader';
import { fetchCategories, checkActiveCategory } from 'app/redux/actions/categories';
import { fetchPairs } from 'app/redux/actions/pairs';

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.props.findCategories();
    }

    componentWillReceiveProps(nextProps) {
        let oldCategoryId = this.props.activeCategoryId;
        let newCategoryId = nextProps.activeCategoryId;
        let categories = nextProps.categories;
        
        // Fetch new pairs in case of changing activeCategoryId
        if ( oldCategoryId !== newCategoryId ) {
            return this.props.findPairs(newCategoryId);
        }

        // First time application have to set categoryId from categories
        if ( !oldCategoryId && nextProps.categories.length > 0 ) {
            let defaultCategoryId = categories[0]._id;

            return this.props.checkActiveCategory(categories[0]._id);
        }
    }

    render() {
        return (
            <Router>
                <div>
                    <Loader loading={this.props.isLoading} />
                    <Header />
                    <Navbar />
                    <ActiveCategory />
                    <Route exact path="/" component={PairPage} />
                    <Route path="/test" component={TestPage} />
                    <Route path="/category" component={CategoryPage} />
                </div>
            </Router>
        );
    }
}

function mapStateToProps({ categories, pairs, activeCategoryId, isLoading }) {
    return {
        categories,
        pairs,
        activeCategoryId,
        isLoading,
    };
}
function mapDispatchToProps(dispatch) {
    return {
        findCategories: () => dispatch(fetchCategories()),
        findPairs: categoryId => dispatch(fetchPairs(categoryId)),
        checkActiveCategory: id => dispatch(checkActiveCategory(id)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
