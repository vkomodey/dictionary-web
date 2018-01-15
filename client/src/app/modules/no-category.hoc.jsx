import React from 'react';
import NavLink from 'app/components/navlink';
import store from '../store';

export default function NoCategoryPage(WrappedPage, pageProps={}) {
    return function Wrapper(props) {
        let { activeCategoryId } = store.getState();

        return (
            <div>
                { !activeCategoryId &&
                     <div className="no-category-container">
                        <div>
                            <span>
                                Please add a category
                            </span>
                        </div>
                        <NavLink to='/category'> Categories Page </NavLink>
                    </div>  
                }
                { activeCategoryId && <WrappedPage { ...pageProps } /> }
            </div>
        );
    }

    return Wrapper;
}
