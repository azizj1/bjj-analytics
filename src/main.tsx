import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from '~/shared/configureStore';
import * as styles from './main.scss';

const store = configureStore();

ReactDOM.render(
    <Provider {...{store}} >
        <div className={styles.test}>Hello</div>
    </Provider>,
    document.getElementById('root')
);
