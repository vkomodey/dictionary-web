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
import noDataHoc from 'app/modules/no-data.hoc';
import { fetchCategories, checkActiveCategory } from 'app/redux/actions/categories';

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

        if ( categories.length === 0 ) {
            return this.props.checkActiveCategory('');
        }
        
        // First time application have to set categoryId from categories
        if ( !oldCategoryId && nextProps.categories.length > 0 ) {
            let defaultCategoryId = categories[0]._id;

            return this.props.checkActiveCategory(categories[0]._id);
        }
    }

    render() {
        let categoriesHocParams = {
            entityName: 'category',
            pageUrl: '/category',
            isDataPresent: Boolean(this.props.activeCategoryId)
        };

        return (
            <Router>
                <div>
                    <Loader loading={this.props.isLoading} />
                    <Header />
                    <Navbar />
                    { this.props.activeCategoryId && this.props.categories.length > 1 &&
                        <ActiveCategory />
                    }
                    <Route exact path="/" component={PairPage} />
                    <Route path="/test" component={TestPage} />
                    <Route path="/category" component={CategoryPage} />
                </div>
            </Router>
        );
    }
}

function mapStateToProps({ categories, activeCategoryId, isLoading }) {
    return {
        categories,
        activeCategoryId,
        isLoading,
    };
}
function mapDispatchToProps(dispatch) {
    return {
        findCategories: () => dispatch(fetchCategories()),
        checkActiveCategory: id => dispatch(checkActiveCategory(id)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
