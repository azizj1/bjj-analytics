import * as React from 'react';
import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { IBjjClassTimeSeries } from '~/bjj/models';
import * as styles from './Graphs.scss';
import { baseOptions, tooltipFormatter } from '~/bjj/components';

interface IBjjClassTimesProps {
    stats: IBjjClassTimeSeries;
    totalMorningHours: number;
    totalAfternoonHours: number;
    totalEveningHours: number;
}

const colors = [
    '#e67e22',
    '#9b59b6',
    '#34495e'
];

export default function BjjClassTimes(
    {
        stats: { morning, afternoon, evening },
        totalMorningHours,
        totalAfternoonHours,
        totalEveningHours
    }: IBjjClassTimesProps
) {
    const lineOptions = {
        ...baseOptions,
        series: [{
            name: 'Morning',
            color: colors[0],
            data: morning
        }, {
            name: 'Afternoon',
            color: colors[1],
            data: afternoon
        }, {
            name: 'Evening',
            color: colors[2],
            data: evening
        }],
        tooltip: {
            formatter: tooltipFormatter
        }
    };
    const pieOptions = {
        ...baseOptions,
        chart: { type: 'pie' },
        series: [{
            data: [{
                name: 'Morning',
                y: totalMorningHours,
                color: colors[0]
            }, {
                name: 'Afternoon',
                y: totalAfternoonHours,
                color: colors[1]
            }, {
                name: 'Evening',
                y: totalEveningHours,
                color: colors[2]
            }]
        }]
    };
    return (
        <div className={styles.root}>
            <h2>Time of day</h2>
            <div className={styles.graphs}>
                <div className={styles.line}>
                    <HighchartsReact highcharts={Highcharts} options={lineOptions} />
                </div>
                <div className={styles.pie}>
                    <HighchartsReact highcharts={Highcharts} options={pieOptions} />
                </div>
            </div>
        </div>
    );
}
