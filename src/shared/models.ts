export interface ICalendarEvent {
    title: string;
    notes: string;
    location: string;
    start: string;
    end: string;
    durationHours: number;
    isAllDay: boolean;
}

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
