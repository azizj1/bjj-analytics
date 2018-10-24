import { ICalendarEvent } from '~/shared/models';

export enum BjjClassTime {
    Morning,
    Afternoon,
    Evening,
    Unknown
}

export enum BjjClassType {
    Gi,
    NoGi,
    Unknown
}

export enum BjjClassLevel {
    Fundamental,
    AllLevels,
    Advanced,
    Unknown
}

export interface IBjjClass extends ICalendarEvent {
    classTime: BjjClassTime;
    type: BjjClassType;
    level: BjjClassLevel;
    taughtBy: string;
    notesTldr: string;
}

export enum BjjBelt {
    White,
    Blue,
    Purple,
    Brown,
    Black
}

export interface IBjjPromotion {
    color: BjjBelt;
    stripes: number;
    date: string;
    timeItTook: string;
    hoursItTook: number;
    isNextPromotion?: boolean;
}

export interface IBjjOverviewStats {
    totalHours: number;
    totalWeeks: number;
    totalClasses: number;
    avgHrsPerWeek: number;
    avgClassesPerWeek: number;
    avgHourPerClass: number;
    trainingDuration: string;
    minHours: number;
    maxHours: number;
}

export interface IBjjStats extends IBjjOverviewStats {
    typeBreakdown: {
        noGiHours: number;
        giHours: number;
    };
    timeBreakdown: {
        morningHours: number;
        afternoonHours: number;
        eveningHours: number;
    };
    promotions: IBjjPromotion[];
    classes: IBjjClass[];
}

export interface IDataPoint {
    x: number;
    y: number;
}

export interface IWeeklyHourPoint extends IDataPoint {
    week: string;
}

export interface IDayOfWeekPoint {
    x: string;
    y: number;
    week: number;
}

export interface IBjjClassTypeSeries {
    gi: IDataPoint[];
    noGi: IDataPoint[];
}

export interface IBjjClassTimeSeries {
    morning: IDataPoint[];
    afternoon: IDataPoint[];
    evening: IDataPoint[];
}

export interface IBjjWeeklyHours {
    hours: number;
    startTime: number;
    week: string;
    weekKey: number;
}

export interface IDaysOfWeekAgg {
    morning: IDayOfWeekPoint[];
    afternoon: IDayOfWeekPoint[];
    evening: IDayOfWeekPoint[];
}

export enum BjjPageSectionType {
    Header,
    Overview,
    Promotions,
    WeeklyHours,
    ClassType,
    ClassTime,
    Instructors,
    DayOfWeek,
    Classes
}

export interface IBjjPageSection {
    type: BjjPageSectionType;
    name?: string;
    divider?: boolean;
    selected?: boolean;
}

export interface IBjjPageFilters {
    query: string;
}

export interface IDictionary<T> {
    [index: string]: T;
}
