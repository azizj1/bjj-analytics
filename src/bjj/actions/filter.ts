import IAction from '~/shared/IAction';
import { IBjjPageFilters } from '~/bjj/models';

export type FilterAction = IAction<'FILTER', { filters: IBjjPageFilters }, void>;

export function filter(filters: IBjjPageFilters): FilterAction {
    return { type: 'FILTER', payload: { filters }};
}
