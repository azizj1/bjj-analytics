import { IBjjStats } from '~/bjj/models';
import { GetBJJStatsRequest, GetBJJStatsSuccess, GetBJJStatsFailure } from '~/bjj/actions/getStats';
import { assertActionsAreHandled } from '~/shared/IAction';
import { IErrorState, initialErrorState } from '~/shared/reducers/errors';

export interface IBjjState {
    stats: IBjjStats | null;
    loading: boolean;
    error: IErrorState;
}

const initialState: IBjjState = {
    stats: null,
    loading: false,
    error: initialErrorState
};

type HandledActions = GetBJJStatsRequest | GetBJJStatsSuccess | GetBJJStatsFailure;

export function bjj(state = initialState, action: HandledActions): IBjjState {
    switch (action.type) {
        case 'GET_BJJ_STATS_REQUEST':
            return { ...state, loading: true };
        case 'GET_BJJ_STATS_SUCCESS':
            return { ...state, stats: (action.payload as any).stats, loading: false, error: {...initialErrorState} };
        case 'GET_BJJ_STATS_FAILURE':
            return { ...state, loading: false, error: {...action.payload} };
        default:
            assertActionsAreHandled(action);
            return state;
    }
}
