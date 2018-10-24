import { createSelector } from 'reselect';
import { getAllClasses, cumSum } from '~/bjj/selectors/util';
import { groupBy, mapValues, pickBy } from 'lodash';

const minClasses = 5;
const capitalize = (name: string) => name.replace(/\b\w/g, l => l.toUpperCase());

export const getInstructorsBreakdown = createSelector(
    getAllClasses,
    classes =>
        pickBy(
            mapValues(
                groupBy(classes, c => capitalize(c.taughtBy.toLowerCase())),
                classesByTeacher => classesByTeacher.reduce(cumSum, [])
            ),
            (points, instructor) => points.length >= minClasses && instructor.trim() !== ''
        )
);
