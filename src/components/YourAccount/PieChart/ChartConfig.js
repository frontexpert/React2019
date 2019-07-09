import Highcharts from 'highcharts';

//height and width is coming from parent container, 36 is subtracted from height due to material select
export const initConfig = (title, data, height, width) => {
    return (
        {
            title: {
                text: title,
                align: 'center',
                verticalAlign: 'middle',
                y: 5,
                style: {"fontSize": "1rem"},
            },
            chart: {
                type: 'pie',
                height: height,
                width: width,
            },
            plotOptions: {
                series: {
                    dataLabels: {
                        enabled: false,
                    },
                },
                pie: {borderColor: null},
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage}%</b>',
            },
            series: [{
                keys: ['name', 'y'],
                data: data,
                showInLegend: false,
                innerSize: '70%',
            }],
            credits: {
                enabled: false,
            },
        }
    )
};

