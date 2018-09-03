import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import configureStore from '~/shared/configureStore';
import Page404 from '~/404';

const store = configureStore();

ReactDOM.render(
    <Provider {...{store}} >
        <Router>
            <Switch>
                <Route component={Page404} />
            </Switch>
        </Router>
    </Provider>,
    document.getElementById('root')
);
