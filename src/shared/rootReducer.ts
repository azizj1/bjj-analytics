import { combineReducers } from 'redux';
import { IBjjState, bjj } from '~/bjj/reducers';

export interface IState {
    bjj: IBjjState;
}

export default combineReducers<IState>({ bjj });
