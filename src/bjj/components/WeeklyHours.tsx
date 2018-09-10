import * as React from 'react';
import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import * as styles from './Graphs.scss';
import { IBjjWeeklyHours, IDataPoint } from '~/bjj/models';
import { baseOptions } from '~/bjj/components';

interface IWeeklyHoursProps {
    stats: IBjjWeeklyHours[];
    statsRegression: IDataPoint[];
}

const colors = [
    '#3498db',
    '#2ecc71'
];


export default function WeeklyHours({stats, statsRegression}: IWeeklyHoursProps) {
    const lineOptions = {
        ...baseOptions,
        series: [{
            name: 'Weekly Hours',
            color: colors[0],
            data: stats.map(s => ({x: s.startTime, y: s.hours, week: s.week})),
            type: 'column'
        }, {
            name: 'Regression',
            color: colors[1],
            data: statsRegression,
            type: 'spline'
        }],
        plotOptions: {
            spline: {
                lineWidth: 1.5,
                enableMouseTracking: false,
                marker: {
                    enabled: false
                },
                dashStyle: 'dash'
            }
        },
        yAxis: {
            title: {
                text: 'Hours'
            }
        },
        legend: {
            enabled: false
        },
        tooltip: {
            formatter: function() {
                return `<span style="font-size: 10px">${this.point.options.week}</span><br/>` +
                `<span style="color:${this.color}">\u25CF</span>` +
                    ` ${this.series.name}: <b>${this.y}hrs</b><br/>`;
            }
        }
    } as Highcharts.Options;

    return (
        <div>
            <h2>Weeky Hours</h2>
            <div className={styles.graphs}>
                <div className={styles.lineFull}>
                    <HighchartsReact highcharts={Highcharts} options={lineOptions} />
                </div>
            </div>
        </div>
    );
}
