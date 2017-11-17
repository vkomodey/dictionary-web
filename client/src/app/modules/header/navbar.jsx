import React from 'react';
import Link from 'react-router-dom';
import Navlink from 'app/components/navlink';

export default function Navbar() {
    return (
        <div className="navbar">
            <Navlink to="/">Home</Navlink>
            <Navlink to="/test">Test</Navlink>
        </div>
    )
}
