import * as moment from 'moment-timezone';

export const mobileWidth = 769;

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
    },
    responsive: {
        rules: [{
            condition: {
                maxWidth: mobileWidth
            },
            chartOptions: {
                yAxis: {
                    title: ''
                }
            }
        }]
    } as any
} as Highcharts.Options;

const isPieSeries = (x: number) => x == null;

export function tooltipFormatter() {
    if (isPieSeries(this.x)) {
        return `<span style="font-size: 10px">${this.key}</span><br/>` +
        `<span style="color:${this.color}">\u25CF</span>` +
            `<b>${this.y}hrs</b> (${Math.round(this.percentage)}%)<br/>`;
    }
    const key = moment.tz(this.key, 'America/Chicago').format('dddd, MMM Do, h:mma');
    return `<span style="font-size: 10px">${key}</span><br/>` +
        `<span style="color:${this.color}">\u25CF</span>` +
            ` ${this.series.name}: <b>${this.y}hrs</b> cumulative<br/>`;
}
