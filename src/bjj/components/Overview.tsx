import * as React from 'react';
import { IBjjOverviewStats, IWeeklyHourPoint } from '~/bjj/models';
import KeyValuePairs from '~/shared/components/KeyValuePairs';
import WeeklyHours from '~/bjj/components/graphs/WeeklyHours';
import * as styles from './graphs/Graphs.scss';

interface IOverviewProps {
    stats: IBjjOverviewStats;
    weeklyHours: IWeeklyHourPoint[];
    weeklyHoursSma: IWeeklyHourPoint[];
}

export default function Overview({
    stats: {
        trainingDuration,
        totalHours,
        totalClasses,
        avgHrsPerWeek,
        avgClassesPerWeek,
        avgHourPerClass
    },
    weeklyHours,
    weeklyHoursSma
}: IOverviewProps) {
    return (
        <div className={styles.root}>
            <h2>Overview</h2>
            <KeyValuePairs keyValues={[
                { key: 'Training duration', value: trainingDuration },
                { key: 'Total hours', value: totalHours + ' hours' },
                { key: 'Total classes', value: totalClasses + ' classes' },
                { key: 'Avg hours/wk', value: readableHours(avgHrsPerWeek) + ' /wk' },
                { key: 'Avg classes/wk', value: Math.round(avgClassesPerWeek * 10) / 10 + ' classes/wk' },
                { key: 'Avg hours/class', value: readableHours(avgHourPerClass) + ' /class' }
            ]} />
            <WeeklyHours stats={weeklyHours} statsSma={weeklyHoursSma} />
        </div>
    );
}

const readableHours = (hrs: number) => `${Math.floor(hrs)} hours ${Math.round((hrs - Math.floor(hrs)) * 60)} mins`;
