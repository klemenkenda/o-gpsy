import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App.jsx';
import * as serviceWorker from './serviceWorker';


// initialize backend
import { setBackend } from "./lib/Backend";
// eslint-disable-next-line
// import { RestBackend } from "./lib/Backend.rest";
// eslint-disable-next-line
// import { MockBackend } from "./lib/Backend.mock";
import { RestBackend } from "./lib/Backend.rest";

// setBackend(new MockBackend());
setBackend(new RestBackend());

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();