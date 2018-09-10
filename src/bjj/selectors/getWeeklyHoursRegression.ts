import { createSelector } from 'reselect';
import getWeeklyHours from '~/bjj/selectors/getWeeklyHours';
import * as regression from 'regression';
import { IDataPoint } from '~/bjj/models';

const getWeeklyHoursRegression = createSelector(
    getWeeklyHours,
    weeklyHours => regression
        .logarithmic(weeklyHours.map(w => [w.startTime, w.hours])).points
        .map((p: number[][]) => ({x: p[0], y: p[1]})) as IDataPoint[]
);

export default getWeeklyHoursRegression;
