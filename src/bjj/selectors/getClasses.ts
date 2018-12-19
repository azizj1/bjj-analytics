import { createSelector } from 'reselect';
import { orderBy } from 'lodash';
import { IState } from '~/shared/rootReducer';
import { getAllClasses } from './util';
import * as Fuse from 'fuse.js';
import { IBjjClass } from '~/bjj/models';

const fuseOptions = {
    tokenize: true,
    matchAllTokens: true,
    findAllMatches: true,
    threshold: 0.3,
    location: 0,
    distance: 5000,
    maxPatternLength: 32,
    minMatchCharLength: 1,
    keys: [
      'taughtBy',
      'notesTldr',
      'notes',
      'title',
      'location'
    ]
};

const isEmpty = (str: string) => str == null || str.trim() === '';

const getFilters = (state: IState) => state.bjj.filters;
const getFuse = createSelector(getAllClasses, classes => new Fuse(classes, fuseOptions));
const getAllDescOrderedClasses = createSelector(getAllClasses, classes => orderBy(classes, 'start', 'desc'));

export const getClasses = createSelector(
    getAllDescOrderedClasses,
    getFuse,
    getFilters,
    (classes, fuse, filters) => isEmpty(filters.query) ?
            classes :
            orderBy(fuse.search<IBjjClass>(filters.query), 'start', 'desc')
);
