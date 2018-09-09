import { createSelector } from 'reselect';
import { IBjjClassTimeSeries, BjjClassTime } from '~/bjj/models';
import { getClasses, cumSum } from '~/bjj/selectors';

const getClassTimeSeries = createSelector(
    getClasses,
    classes => ({
        morning: classes.filter(c => c.classTime === BjjClassTime.Morning).reduce(cumSum, []),
        afternoon: classes.filter(c => c.classTime === BjjClassTime.Afternoon).reduce(cumSum, []),
        evening: classes.filter(c => c.classTime === BjjClassTime.Evening).reduce(cumSum, [])
    }) as IBjjClassTimeSeries
);

export default getClassTimeSeries;
