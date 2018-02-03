import React from 'react';
import PropTypes from 'prop-types';
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

class App extends React.Component {
    static propTypes = {
        findCategories: PropTypes.func.isRequired,
        checkActiveCategory: PropTypes.func.isRequired,
        activeCategoryId: PropTypes.string,
        isLoading: PropTypes.bool,
        categories: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)),
    }

    static defaultProps = {
        activeCategoryId: '',
        isLoading: false,
        categories: [],
    }
    componentWillMount() {
        this.props.findCategories();
    }

    componentWillReceiveProps(nextProps) {
        let oldCategoryId = this.props.activeCategoryId;
        let { categories } = nextProps;

        if ( categories.length === 0 ) {
            this.props.checkActiveCategory('');
        }

        // First time application have to set categoryId from categories
        console.log({ oldCategoryId });
        console.log({ c: nextProps.categories });

        if ( !oldCategoryId && nextProps.categories.length > 0 ) {
            this.props.checkActiveCategory(categories[0]._id);
        }
    }

    render() {
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
