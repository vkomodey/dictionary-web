import React from 'react';
import Navlink from 'app/components/navlink';
import './style.scss';

export default function Navbar() {
    return (
        <div className="navbar">
            <Navlink to="/">Storage</Navlink>
            <Navlink to="/test">Test</Navlink>
        </div>
    );
}
