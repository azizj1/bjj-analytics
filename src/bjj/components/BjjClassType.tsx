import * as React from 'react';
import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { IBjjClassTypeSeries } from '~/bjj/models';
import * as styles from './Graphs.scss';

const baseOptions = {
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
    }
};

interface IBjjClassTypeProps {
    stats: IBjjClassTypeSeries;
    totalGiHours: number;
    totalNoGiHours: number;
    colors: string[];
}

export default function BjjClassType({stats: {gi, noGi}, totalNoGiHours, totalGiHours, colors}: IBjjClassTypeProps) {
    const lineOptions = { ...baseOptions, series: [{
        name: 'Gi',
        color: colors[0],
        data: gi
    }, {
        name: 'NoGi',
        color: colors[1],
        data: noGi
    }]};
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
        }],
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
                }
            }
        }
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
