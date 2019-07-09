import coindata from '../../../mock/coin-data-map';// TODO: MOCK DATA -- WILL REMOVE
import {format7DigitString} from '../../../utils';

const formatString = string => parseInt(string).toLocaleString('en-US', {minimumFractionDigits: 2})

export const initConfig = (data, height, width) => {
   const animation = true;
   const pieChartSize = width < 200 ? width - 25 : width - 65;
   const centerX = width / 2 - 20;
   const centerY = height / 2 - 20;

   let circleChartColors = [];
   let circleChartTooltipData = {};

   for (let index = 0; index < data.length; index++) {
      const iData = data[index];
      let currencySymbol = iData[0];
      let currencyName = (currencySymbol in coindata && 'name' in coindata[currencySymbol]) ? coindata[currencySymbol].name : '';
      let currencyColor = '#555';
      if (currencySymbol in coindata && 'hex' in coindata[currencySymbol]) {
         currencyColor = coindata[currencySymbol].hex;
      }
      circleChartColors.push(currencyColor);

      circleChartTooltipData[currencySymbol] = {
         price: "$" + formatString(iData[2]),
         name: currencyName,
         position: iData[3],
      }
   }

   return (
      {
         title: null,
         chart: {
            type: 'pie',
            height: height,
            width: width,
            spacingLeft: 0,
            spacingTop: 0,
            backgroundColor: 'rgba(255, 255, 255, 0.0)',
            marginLeft: 0,
         },
         plotOptions: {
            series: {
               dataLabels: {
                  enabled: false,
               },
               states: {
                  hover: {
                     enabled: false,
                  },
               },
            },
            pie: {
               innerSize: '60%',
               borderColor: '#18202d',
               borderWidth: 2,
               startAngle: 0,
               size: pieChartSize,
               center: [centerX, centerY],
               colors: circleChartColors,
               animation: animation,
            },
         },
         tooltip: {
            backgroundColor: 'rgba(0,0,0,0)',
            borderColor: '#000000',
            borderWidth: 0,
            padding: 0,
            color: '#000000',
            useHTML: true,
            shadow: false,
            formatter: function () {
               const currency = this.key;
               return '<div class="tooltipCircle arrow_box left">' +
                  '<img style="width: 20px; height: 20px;" src="img/coin/coin-' + currency.toLowerCase() + '.svg"/>' +
                  '<div class="amount">' + format7DigitString(circleChartTooltipData[currency].position) + '</div>' +
                  '<div class="currency">' + currency + '</div>' +
                  '<div class="price"><span>(' + circleChartTooltipData[currency].price + ')</span></div>' +
                  '</div>';
            },
            positioner: function (labelWidth, labelHeight, point) {
               return {
                  x: point.plotX + 10,
                  y: point.plotY - labelHeight / 2,
               };
            },
         },
         series: [{
            keys: ['name', 'y'],
            data: data,
            // showInLegend: false,
            // innerSize: '90%',
         }],
         credits: {
            enabled: false,
         },
      }
   )
};

