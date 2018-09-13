import * as React from 'react';
import { IBjjOverviewStats } from '~/bjj/models';
import KeyValuePairs from '~/shared/components/KeyValuePairs';
import * as styles from './graphs/Graphs.scss';

interface IOverviewProps {
    stats: IBjjOverviewStats;
}

export default class Overview extends React.PureComponent<IOverviewProps> {
    render() {
        const {
            stats: {
                trainingDuration,
                totalHours,
                totalClasses,
                avgHrsPerWeek,
                avgClassesPerWeek,
                avgHourPerClass
            }
        } = this.props;
        return (
            <div className={styles.root}>
                <h2>Overview</h2>
                <KeyValuePairs keyValues={[
                    { key: 'Training duration', value: trainingDuration },
                    { key: 'Total hours', value: totalHours + ' hours' },
                    { key: 'Total classes', value: totalClasses + ' classes' },
                    { key: 'Avg hours/wk', value: this.readableHours(avgHrsPerWeek) + ' /wk' },
                    { key: 'Avg classes/wk', value: Math.round(avgClassesPerWeek * 10) / 10 + ' classes/wk' },
                    { key: 'Avg hours/class', value: this.readableHours(avgHourPerClass) + ' /class' }
                ]} />
            </div>
        );
    }

    readableHours = (hrs: number) => `${Math.floor(hrs)} hours ${Math.round((hrs - Math.floor(hrs)) * 60)} mins`;
}
