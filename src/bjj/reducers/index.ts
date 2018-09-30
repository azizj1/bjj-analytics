import { IBjjStats, IBjjPageFilters } from '~/bjj/models';
import { GetBJJStatsRequest, GetBJJStatsSuccess, GetBJJStatsFailure } from '~/bjj/actions/getStats';
import { assertActionsAreHandled } from '~/shared/IAction';
import { IErrorState, initialErrorState } from '~/shared/reducers/errors';
import { FilterAction } from '~/bjj/actions/filter';

export interface IBjjState {
    stats: IBjjStats | null;
    loading: boolean;
    error: IErrorState;
    filters: IBjjPageFilters;
}

const initialState: IBjjState = {
    stats: {
        totalHours: 0,
        totalWeeks: 0,
        totalClasses: 0,
        avgHrsPerWeek: 0,
        avgClassesPerWeek: 0,
        avgHourPerClass: 0,
        trainingDuration: '',
        minHours: 0,
        maxHours: 0,
        typeBreakdown: {
            giHours: 0,
            noGiHours: 0
        },
        timeBreakdown: {
            morningHours: 0,
            afternoonHours: 0,
            eveningHours: 0
        },
        promotions: [],
        classes: []
    },
    loading: false,
    error: initialErrorState,
    filters: {
        query: ''
    }
};

type HandledActions = GetBJJStatsRequest | GetBJJStatsSuccess | GetBJJStatsFailure | FilterAction;

export function bjj(state = initialState, action: HandledActions): IBjjState {
    switch (action.type) {
        case 'GET_BJJ_STATS_REQUEST':
            return { ...state, loading: true };
        case 'GET_BJJ_STATS_SUCCESS':
            return { ...state, stats: (action.payload as any).stats, loading: false, error: {...initialErrorState} };
        case 'GET_BJJ_STATS_FAILURE':
            return { ...state, loading: false, error: {...action.payload} };
        case 'FILTER':
            return { ...state, filters: action.payload.filters };
        default:
            assertActionsAreHandled(action);
            return state;
    }
}
