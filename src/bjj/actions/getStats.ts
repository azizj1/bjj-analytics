import IAction from '~/shared/IAction';

export type GetBJJStatsRequest = IAction<'GET_BJJ_STATS_REQUEST', void, void>;
export type GetBJJStatsSuccess = IAction<'GET_BJJ_STATS_SUCCESS', void, void>;
export type GetBJJStatsFailure = IAction<'GET_BJJ_STATS_FAILURE', void, void>;
