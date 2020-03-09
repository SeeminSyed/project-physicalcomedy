import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import App from './App';
import * as serviceWorker from './serviceWorker';
import Connect from './components/Connect';
import Receive from './components/Receive';
import NotFound from './pages/NotFound';

// https://codeburst.io/getting-started-with-react-router-5c978f70df91
const routing = (
    <Router>
        <div>
            <Switch>
                <Route exact path="/" component={App} />
                <Route path="/connect" component={Connect} />
                <Route path="/receive" component={Receive} />
                <Route component={NotFound} />
            </Switch>
        </div>
    </Router>
)

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
