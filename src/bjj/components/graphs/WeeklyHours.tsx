import * as React from 'react';
import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { baseOptions } from '~/bjj/components/graphs';
import { IWeeklyHourPoint } from '~/bjj/models';
import * as styles from './Graphs.scss';

interface IWeeklyHoursProps {
    stats: IWeeklyHourPoint[];
    statsSma: IWeeklyHourPoint[];
}

const colors = [
    '#3498db',
    '#2ecc71'
];

export default function WeeklyHours({stats, statsSma}: IWeeklyHoursProps) {
    const lineOptions = {
        ...baseOptions,
        series: [{
            name: 'Weekly Hours',
            color: colors[0],
            data: stats,
            type: 'column'
        }, {
            name: 'Moving Average',
            color: colors[1],
            data: statsSma,
            type: 'spline'
        }],
        plotOptions: {
            spline: {
                lineWidth: 1.5,
                // enableMouseTracking: false,
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
            <h3>Weekly hours over Time</h3>
            <div className={styles.graphs}>
                <div className={styles.lineFull}>
                    <HighchartsReact highcharts={Highcharts} options={lineOptions} />
                </div>
            </div>
        </div>
    );
}
