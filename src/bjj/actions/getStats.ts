import IAction from '~/shared/IAction';
import calendarApi from '~/api/calendarApi';
import { IBjjStats } from '~/bjj/models';
import { IErrorPayload } from '~/shared/reducers/errors';
import { unhandledApiError } from '~/shared/actions/errors';

export type GetBJJStatsRequest = IAction<'GET_BJJ_STATS_REQUEST', void, void>;
export type GetBJJStatsSuccess = IAction<'GET_BJJ_STATS_SUCCESS', { stats: IBjjStats }, void>;
export type GetBJJStatsFailure = IAction<'GET_BJJ_STATS_FAILURE', IErrorPayload, void>;

export function getBjjStats() {
    return async (dispatch: Function) => {
        dispatch(getBjjStatsRequest());
        try {
            const stats = await calendarApi.getBjjStats();
            dispatch(getBjjStatsSuccess(stats));
        } catch (err) {
            dispatch(unhandledApiError(err, 'GET_BJJ_STATS_FAILURE'));
        }
    };
}
function getBjjStatsRequest(): GetBJJStatsRequest {
    return { type: 'GET_BJJ_STATS_REQUEST', payload: void 0 };
}

function getBjjStatsSuccess(stats: IBjjStats): GetBJJStatsSuccess {
    return { type: 'GET_BJJ_STATS_SUCCESS', payload: { stats } };
}
