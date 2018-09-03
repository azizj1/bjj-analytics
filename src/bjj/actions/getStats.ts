import IAction from '~/shared/IAction';
import calendarApi from '~/api/calendarApi';
import { IBjjStats } from '~/bjj/models';

export type GetBJJStatsRequest = IAction<'GET_BJJ_STATS_REQUEST', void, void>;
export type GetBJJStatsSuccess = IAction<'GET_BJJ_STATS_SUCCESS', { stats: IBjjStats }, void>;
export type GetBJJStatsFailure = IAction<'GET_BJJ_STATS_FAILURE', void, void>;

export function getBjjStats() {
    return async (dispatch: Function) => {
        dispatch(getBjjStatsRequest());
        try {
            const stats = await calendarApi.getBjjStats();
            dispatch(getBjjStatsSuccess(stats));
        } catch {
            dispatch(getBjjStatsFailure());
        }
    };
}
function getBjjStatsRequest(): GetBJJStatsRequest {
    return { type: 'GET_BJJ_STATS_REQUEST', payload: void 0 };
}

function getBjjStatsSuccess(stats: IBjjStats): GetBJJStatsSuccess {
    return { type: 'GET_BJJ_STATS_SUCCESS', payload: { stats } };
}

function getBjjStatsFailure(): GetBJJStatsFailure {
    return { type: 'GET_BJJ_STATS_FAILURE', payload: void 0 };
}
