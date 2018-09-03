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

export interface IBjjStats {
    totalHours: number;
    totalWeeks: number;
    totalClasses: number;
    typeBreakdown: {
        noGiHours: number;
        giHours: number;
    };
    timeBreakdown: {
        morningHours: number;
        afternoonHours: number;
        eveningHours: number;
    };
    totalFundamentalHours: number;
    avgHrsPerWeek: number;
    avgClassesPerWeek: number;
    avgHourPerSession: number;
    trainingDuration: string;
    minHours: number;
    maxHours: number;
    classes: IBjjClass[];
}
