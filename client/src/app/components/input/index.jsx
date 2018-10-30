import React from 'react';
import './style.scss';

export default function Input(props) {
    return (
        <input
            type="text"
            {...props}
        />
    );
}
