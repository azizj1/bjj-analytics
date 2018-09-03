import { ICalendarEvent } from '~/shared/models';
import { GetBJJStatsRequest, GetBJJStatsSuccess, GetBJJStatsFailure } from '~/bjj/actions/getStats';
import { assertActionsAreHandled } from '~/shared/IAction';

export interface IBjjState {
    classes: ICalendarEvent[];
    loading: boolean;
}

const initialState: IBjjState = {
    classes: [],
    loading: false
};

type HandledActions = GetBJJStatsRequest | GetBJJStatsSuccess | GetBJJStatsFailure;

export function bjj(state = initialState, action: HandledActions): IBjjState {
    switch (action.type) {
        case 'GET_BJJ_STATS_REQUEST':
            return { ...state, loading: true };
        case 'GET_BJJ_STATS_SUCCESS':
            return { ...state, loading: false };
        case 'GET_BJJ_STATS_FAILURE':
            return { ...state, loading: false };
        default:
            assertActionsAreHandled(action);
            return state;
    }
}
