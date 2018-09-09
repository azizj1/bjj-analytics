import { createSelector } from 'reselect';
import { BjjClassType, IBjjClassTypeSeries } from '~/bjj/models';
import { getClasses, cumSum } from '~/bjj/selectors';

const getClassTypesSeries = createSelector(
    getClasses,
    classes => ({
        gi: classes.filter(c => c.type === BjjClassType.Gi).reduce(cumSum, []),
        noGi: classes.filter(c => c.type === BjjClassType.NoGi).reduce(cumSum, [])
    }) as IBjjClassTypeSeries
);

export default getClassTypesSeries;
