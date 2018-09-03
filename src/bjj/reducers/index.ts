import { IBjjStats } from '~/bjj/models';
import { GetBJJStatsRequest, GetBJJStatsSuccess, GetBJJStatsFailure } from '~/bjj/actions/getStats';
import { assertActionsAreHandled } from '~/shared/IAction';

export interface IBjjState {
    stats: IBjjStats | null;
    loading: boolean;
}

const initialState: IBjjState = {
    stats: null,
    loading: false
};

type HandledActions = GetBJJStatsRequest | GetBJJStatsSuccess | GetBJJStatsFailure;

export function bjj(state = initialState, action: HandledActions): IBjjState {
    switch (action.type) {
        case 'GET_BJJ_STATS_REQUEST':
            return { ...state, loading: true };
        case 'GET_BJJ_STATS_SUCCESS':
            return { ...state, stats: (action.payload as any).stats, loading: false };
        case 'GET_BJJ_STATS_FAILURE':
            return { ...state, loading: false };
        default:
            assertActionsAreHandled(action);
            return state;
    }
}
