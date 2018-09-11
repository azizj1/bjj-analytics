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
}

export interface IBjjOverviewStats {
    totalHours: number;
    totalWeeks: number;
    totalClasses: number;
    avgHrsPerWeek: number;
    avgClassesPerWeek: number;
    avgHourPerSession: number;
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
    classes: IBjjClass[];
}

export interface IDataPoint {
    x: number;
    y: number;
}

export interface IWeeklyHourPoint extends IDataPoint {
    week: string;
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
