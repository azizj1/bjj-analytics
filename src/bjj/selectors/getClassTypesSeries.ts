import { IState } from '~/shared/rootReducer';
import { createSelector } from 'reselect';
import { BjjClassType, IBjjClass, IBjjClassTypeSeries, IDataPoint } from '~/bjj/models';

const getClasses = (state: IState) => state.bjj.stats && state.bjj.stats.classes || [];

const getClassTypesSeries = createSelector(
    getClasses,
    classes => ({
        gi: classes.filter(c => c.type === BjjClassType.Gi).reduce(cumSum, []),
        noGi: classes.filter(c => c.type === BjjClassType.NoGi).reduce(cumSum, [])
    }) as IBjjClassTypeSeries
);

export const cumSum =
    (acc: IDataPoint[], curr: IBjjClass, index: number) => [...acc, {
        x: (new Date(curr.start)).getTime(),
        y: curr.durationHours + (acc[index - 1] || {y: 0}).y
    }];

export default getClassTypesSeries;
