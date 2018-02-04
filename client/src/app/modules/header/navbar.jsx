import React from 'react';
import Navlink from 'app/components/navlink';

export default function Navbar() {
    return (
        <div className="navbar">
            <Navlink to="/">Storage</Navlink>
            <Navlink to="/category">Categories</Navlink>
            <Navlink to="/test">Test</Navlink>
        </div>
    );
}
