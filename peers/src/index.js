import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import App from './App';
import Charades from './pages/Charades';
import NotFound from './pages/NotFound';
import Pictionary from './pages/Pictionary';
import './index.css';

import * as serviceWorker from './serviceWorker';

// https://codeburst.io/getting-started-with-react-router-5c978f70df91
const routing = (
    <Router>
        <div>
            {/* <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/create">Create</Link>
                </li>
            </ul> */}
            {/* Switch component helps us to render the components only when path matches otherwise it fallbacks to the not found component. */}
            <Switch>
                <Route exact path="/" component={App} />
                <Route exact path="/charades" component={Charades} />
                <Route exact path="/pictionary" component={Pictionary}/>
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
