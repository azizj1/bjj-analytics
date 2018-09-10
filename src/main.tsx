import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import configureStore from '~/shared/configureStore';
import Page404 from '~/404';
import BjjPage from '~/bjj/BjjPage';
import '~/shared/styles/styles.scss';

const store = configureStore();

ReactDOM.render(
    <Provider {...{store}} >
        <Router>
            <Switch>
                <Route exact path='/' component={BjjPage} />
                <Route exact path='/bjj' component={BjjPage} />
                <Route component={Page404} />
            </Switch>
        </Router>
    </Provider>,
    document.getElementById('root')
);
