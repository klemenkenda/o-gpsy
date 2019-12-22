import React from 'react';
import ReactDOM from 'react-dom';
import App from '../components/App';
import * as serviceWorker from '../serviceWorker';

// initialize backend
import { setBackend } from '../lib/Backend';
// eslint-disable-next-line
// import { RestBackend } from "./lib/Backend.rest";
// eslint-disable-next-line
import { MockBackend } from "../lib/Backend.mock";
// import { RestBackend } from './lib/Backend.rest';

setBackend(new MockBackend());
// setBackend(new RestBackend());

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
});
