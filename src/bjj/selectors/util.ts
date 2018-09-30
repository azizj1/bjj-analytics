import { IState } from '~/shared/rootReducer';
import { IDataPoint, IBjjClass } from '~/bjj/models';
import { createSelector } from 'reselect';

const getAllBjjEvents = (state: IState) => state.bjj.stats.classes;
export const getAllClasses = createSelector(getAllBjjEvents, classes => classes.filter(c => !c.isAllDay));

export const cumSum =
    (acc: IDataPoint[], curr: IBjjClass, index: number) => [...acc, {
        x: (new Date(curr.start)).getTime(),
        y: curr.durationHours + (acc[index - 1] || {y: 0}).y
    }];
