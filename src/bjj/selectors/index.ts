import { IState } from '~/shared/rootReducer';
import { IDataPoint, IBjjClass } from '~/bjj/models';

export const getClasses = (state: IState) => state.bjj.stats && state.bjj.stats.classes || [];

export const cumSum =
    (acc: IDataPoint[], curr: IBjjClass, index: number) => [...acc, {
        x: (new Date(curr.start)).getTime(),
        y: curr.durationHours + (acc[index - 1] || {y: 0}).y
    }];
