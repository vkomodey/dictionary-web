import React from 'react';
import NavLink from 'app/components/navlink';

export default function NoDataHoc(WrappedPage, params) {
    let { entityName, pageUrl, isDataPresent } = params;

    return function Wrapper(props) {
        return (
            <div>
                { !isDataPresent &&
                     <div className="no-data-container">
                        <div>
                            <span>
                                Please add a { entityName }
                            </span>
                        </div>
                        { pageUrl &&
                            <NavLink to={pageUrl}> {entityName} page </NavLink>
                        }
                        { props.children }
                    </div>  
                }
                { isDataPresent && <WrappedPage /> }
            </div>
        );
    }

    return Wrapper;
}
