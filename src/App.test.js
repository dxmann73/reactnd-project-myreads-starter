import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

/**
 Simple test we don't crash directly
 **/

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
});


