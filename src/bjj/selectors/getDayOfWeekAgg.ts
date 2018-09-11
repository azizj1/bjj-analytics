import { createSelector } from 'reselect';
import { getClasses } from '~/bjj/selectors';
import * as moment from 'moment';
import { IDayOfWeekPoint, IBjjClass, BjjClassTime } from '~/bjj/models';

const getDayOfWeekAgg = createSelector(
    getClasses,
    classes => ({
        morning: daysOfWeek(classes.filter(c => c.classTime === BjjClassTime.Morning)),
        afternoon: daysOfWeek(classes.filter(c => c.classTime === BjjClassTime.Afternoon)),
        evening: daysOfWeek(classes.filter(c => c.classTime === BjjClassTime.Evening))
    })
);

function daysOfWeek(classes: IBjjClass[]) {
    const dict = classes.reduce((acc, curr) => {
        const start = moment.parseZone(curr.start, moment.ISO_8601, true);
        const week = start.isoWeekday();
        if (acc[week])
            acc[week].y += curr.durationHours;
        else
            acc[week] = {
                x: days[week - 1],
                y: curr.durationHours,
                week
            };
        return acc;
    }, initial());
    return Object.keys(dict).map(k => dict[parseInt(k, 10)]);
}

export const days = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday'
];

export const initial = () => ({
    1: { x: days[0], y: 0, week: 1},
    2: { x: days[1], y: 0, week: 2},
    3: { x: days[2], y: 0, week: 3},
    4: { x: days[3], y: 0, week: 4},
    5: { x: days[4], y: 0, week: 5},
    6: { x: days[5], y: 0, week: 6},
    7: { x: days[6], y: 0, week: 7}
} as {[key: number]: IDayOfWeekPoint});


export default getDayOfWeekAgg;
