import { createSelector } from 'reselect';
import { getClasses } from '~/bjj/selectors';
import { IBjjWeeklyHours, IWeeklyHourPoint } from '~/bjj/models';
import * as moment from 'moment';

export const getWeeklyHoursWithKey = createSelector(
    getClasses,
    classes => classes.filter(c => !c.isAllDay).reduce((acc, curr) => {
        let last = acc.pop();
        const start = moment.parseZone(curr.start, moment.ISO_8601, true);
        if (last == null)
            last = weeklyHour(curr.durationHours, start);
        else if (last.weekKey === weekKey(start))
            last.hours += curr.durationHours;
        acc.push(last);

        if (last != null && last.weekKey !== weekKey(start)) {
            const newLast = weeklyHour(curr.durationHours, start);
            acc.push(newLast);
        }
        return acc;
    }, [] as IBjjWeeklyHours[])
);

const weekString = (datetime: moment.Moment) => {
    return datetime.clone().isoWeekday(1).format('MMM Do') +
    ' to ' +
    datetime.clone().isoWeekday(7).format('MMM Do');
};

const weekKey = (datetime: moment.Moment) => datetime.year() * 100 + datetime.isoWeek();

const weeklyHour = (hours: number, datetime: moment.Moment) => ({
    hours,
    startTime: parseInt(datetime.clone().isoWeekday(1).format('x'), 10),
    week: weekString(datetime),
    weekKey: weekKey(datetime)
});

const getWeeklyHours = createSelector(
    getWeeklyHoursWithKey,
    hours => hours.map(h => ({x: h.startTime, y: h.hours, week: h.week})) as IWeeklyHourPoint[]
);

export default getWeeklyHours;
