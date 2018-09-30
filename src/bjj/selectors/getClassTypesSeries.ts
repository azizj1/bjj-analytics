import { createSelector } from 'reselect';
import { BjjClassType, IBjjClassTypeSeries } from '~/bjj/models';
import { getAllClasses, cumSum } from '~/bjj/selectors/util';

export const getClassTypesSeries = createSelector(
    getAllClasses,
    classes => ({
        gi: classes.filter(c => c.type === BjjClassType.Gi).reduce(cumSum, []),
        noGi: classes.filter(c => c.type === BjjClassType.NoGi).reduce(cumSum, [])
    }) as IBjjClassTypeSeries
);
