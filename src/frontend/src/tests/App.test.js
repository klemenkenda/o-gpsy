import React from 'react';
import ReactDOM from 'react-dom';
import App from '../components/App';

// initialize backend
import { setBackend } from '../lib/Backend';
// eslint-disable-next-line
import { MockBackend } from "../lib/Backend.mock";
setBackend(new MockBackend());

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
});
