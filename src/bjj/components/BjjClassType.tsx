import * as React from 'react';
import * as Highcharts from 'highcharts';
import * as moment from 'moment-timezone';
import HighchartsReact from 'highcharts-react-official';
import { IBjjClassTypeSeries } from '~/bjj/models';
import * as styles from './Graphs.scss';

export const baseOptions = {
    title: {
        text: undefined as any
    },
    credits: {
        enabled: false
    },
    xAxis: {
        type: 'datetime'
    },
    yAxis: {
        title: {
            text: 'Cumulative hours'
        }
    },
    plotOptions: {
        pie: {
            dataLabels: {
                distance: -70,
                color: 'white',
                formatter: function() {
                    return `<div class='hcCenter'>` +
                        `<span>${this.point.name}</span><span>${this.y}hrs (${Math.round(this.percentage)}%)</span>`
                        + `</div>`;
                },
                useHTML: true
            },
            tooltip: {
                pointFormatter: function() {
                    return `<span style="color:${this.color}">\u25CF</span>` +
                        `<b>${this.y}</b>hrs (${Math.round(this.percentage)}%)<br/>`;
                }
            }
        }
    }
} as Highcharts.Options;

interface IBjjClassTypeProps {
    stats: IBjjClassTypeSeries;
    totalGiHours: number;
    totalNoGiHours: number;
}

const colors = [
    '#2ecc71',
    '#3498db'
];

export function lineTooltipFormatter() {
    const key = moment.tz(this.key, 'America/Chicago').format('dddd, MMM Do, h:mma');
    return `<span style="font-size: 10px">${key}</span><br/>` +
        `<span style="color:${this.color}">\u25CF</span>` +
            ` ${this.series.name}: <b>${this.y}hrs</b> cumulative<br/>`;
}

export default function BjjClassType({stats: {gi, noGi}, totalNoGiHours, totalGiHours}: IBjjClassTypeProps) {
    const lineOptions = {
        ...baseOptions,
        series: [{
            name: 'Gi',
            color: colors[0],
            data: gi
        }, {
            name: 'NoGi',
            color: colors[1],
            data: noGi
        }],
        tooltip: {
            formatter: lineTooltipFormatter
        }
    };
    const pieOptions = {
        ...baseOptions,
        chart: { type: 'pie' },
        series: [{
            data: [{
                name: 'Gi',
                y: totalGiHours,
                color: colors[0]
            }, {
                name: 'NoGi',
                y: totalNoGiHours,
                color: colors[1]
            }]
        }]
    };
    return (
        <div>
            <h2>Gi vs. NoGi</h2>
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
