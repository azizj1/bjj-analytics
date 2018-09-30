import { IWeeklyHourPoint } from '~/bjj/models';
import { createSelector } from 'reselect';
import { getWeeklyHoursWithKey } from '~/bjj/selectors/getWeeklyHours';

const period = 4;

export const getWeeklyHoursSma = createSelector(
	getWeeklyHoursWithKey,
	weeklyHours => weeklyHours.reduce((acc, curr, index) => {
		if (index % period === 0)
			acc.push({
				x: curr.startTime,
				y: curr.hours / period,
				week: curr.week
			});
		else
			acc[acc.length - 1] = {
				x: curr.startTime,
				y: acc[acc.length - 1].y + curr.hours / period,
				week: curr.week
			};
		return acc;
	}, [] as IWeeklyHourPoint[])
);
