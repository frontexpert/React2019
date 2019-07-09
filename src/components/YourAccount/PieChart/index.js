/* eslint-disable react/no-danger */
import React, {Fragment} from 'react';
import styled from 'styled-components';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import {AutoSizer} from 'react-virtualized';
import {initConfig} from './ChartConfig';
import {renderSvg} from '../../../utils';
import {STORE_KEYS} from '../../../stores';
import {inject, observer} from 'mobx-react';

// we need to round data to achieve few things
// 1 instead of showing 88.9783283258932887953%
//   we'd happily show 88.97
// 2 but we also need to count on 0.00015% of (for example) portfolio pie data
//   so it won't be wiped out

const roundData = data => {
   const roundedData = data
      .filter(item => item[1] > 0)
      .map(item => {
         const roundedNum = parseFloat((item[1] * 100).toFixed(3))
         return [item[0], roundedNum, item[2], item[3]]
         // in case we want to work with sliced stuff
         // but I could not achieve a look as per design
         // return {name: item[0], y: roundedNum, sliced: true}
      })

   return roundedData
};

const AccountsDiagramWrap = styled.div`
    position: absolute;
    left: 0;
    bottom: 0;
    .accounts-diagram {
        position: relative;
        height: 100%;
        width: 100%;
        z-index: 2;
    }
    background: transparent;
    height: height;
    rect{
        fill: ${props => props.theme.palette.backgroundHighContrast};
    }
    text{
        fill: ${props => props.theme.palette.clrtextD} !important;
    }
    .highcharts-tooltip-box{
        fill: ${props => props.theme.palette.backgroundHighContrast};
    }
    
    .highcharts-background, .highcharts-plot-border, .highcharts-plot-background {
        fill: transparent !important;
    }
    
    .highcharts-tooltip {
        z-index: 9998 !important;
    }
    
    .highcharts-tooltip {
        font-family: 'open_sans', sans-serif;
        div.tooltip,
        div.tooltipCircle {
            opacity: 1;
            padding: 2px 5px;
            z-index: 999999 !important;
            font-size: 11px;
            border-radius: 3px;
            line-height: 20px;
            background-color: ${props => props.theme.palette.clrblock};
            border: 1px solid ${props => props.theme.palette.clrseparatorD};
            color: ${props => props.theme.palette.clrtextL};
            box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.25);
            span {
                color: ${props => props.theme.palette.clrtextD};
            }
            &.arrow_box.left:after {
                border-right-color: ${props => props.theme.palette.clrseparatorD};
            }
        }
        div.tooltip {
            color: ${props => props.theme.palette.clrtexttooltip};
            font-weight: 600;
            .textCenter {
                text-align: center;
            }
            &.mainTooltip {
                font-size: 11px;
                span {
                    color: ${props => props.theme.palette.clrtexttooltip};
                }
                .currencies {
                    font-size: 12px;
                }
                .value {
                    font-size: 12px;
                    font-weight: 700;
                }
                div:first-child {
                    margin-bottom: -7px;
                }
            }
            &.blackColor {
                color: ${props => props.theme.palette.clrtextD};
            }
        }
        div.tooltipCircle {
            font-family: 'open_sans', sans-serif;
            padding: 4px 8px;
            min-width: 168px;
            display: flex;
            line-height: 20px;
            font-weight: 700;
            font-size: 14px;
            z-index: 9999999 !important;
            
            .amount {
                font-weight: 700;
                padding-left: 5px;
                margin: 0;
                display: block;
                color: ${props => props.theme.palette.clrtextD};
                line-height: 20px;
                font-size: 14px;
            }
            
            .currency {
                font-weight: 500;
                padding-left: 4px;
                margin: 0;
                display: block;
                color: ${props => props.theme.palette.clrtextD};
                line-height: 20px;
            }
            .price {
                font-weight: 500;
                padding-left: 4px;
                line-height: 20px;
                color: ${props => props.theme.palette.clrtextD};

                span {
                    line-height: 20px;
                }
            }
        }
        span svg {
            width: 20px;
            height: 20px;
            position: relative;
            margin: 0px 3px 0px 0px;
            flex: 0 0 20px;
        }
        div.font12 {
            font-size: 12px;
            margin-bottom: -7px;
        }
        div.font10 {
            font-size: 10px;
            font-weight: 300;
        }
        .bold {
            font-weight: bold;
        }
        .light {
            font-weight: 100;
            font-size: 10px;
        }
    }
    
    .arrow_box:after {
        top: 50%;
        border: solid transparent;
        content: " ";
        height: 0;
        width: 0;
        position: absolute;
        pointer-events: none;
        border-color: rgba(136, 183, 213, 0);
        border-width: 7px;
        margin-top: -7px;
    }
    
    .arrow_box.right:after {
        left: 100%;
        border-left-color: ${props => props.theme.palette.clrbacktooltip};
    }
    
    .arrow_box.left:after {
        right: 100%;
        border-right-color: ${props => props.theme.palette.clrbacktooltip};
    }
    
    .lineForMainChart {
        position: absolute;
        left: -9999px;
        pointer-events: none;
        z-index: 3001;
        .circle {
            position: relative;
            width: 14px;
            height: 14px;
            background: rgba(222, 222, 222, 0.6);
            border: 1.5px solid ${props => props.theme.palette.clrbacktooltip};
            border-radius: 50%;
            transform: translateX(-50%) translateY(-50%);
            box-shadow: 0px 2px 5px 0px ${props => props.theme.palette.clrbackarrow};
        }
        .line {
            background: linear-gradient(to bottom, rgba(44, 49, 55, 1), rgba(44, 49, 55, 0.4));
            width: 1px;
            height: 1px;
            margin-top: -6px;
            transform: translateX(-50%);
        }
    }
`;

const CircleChartText = styled.div`
    display: flex;
	position: absolute;
	width: 160px;
    @media(max-width: 1300px){
	    width: 145px;
    }
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	border-radius: 50%;
	z-index: 1;
	color: ${props => props.theme.palette.clrtextD};
	transition: all 0.1s;
	padding-top: 50px;
    pointer-events: none;
	
	.sprite-icon{
    width: 35px;
		height: 32px;
		fill: ${props => props.theme.palette.clrtextD};
		margin: auto 0;
        margin-left: 10px;
	}
	
	.wrap {
		text-align: center;
		position: relative;
		z-index: 1;
		flex: 1;

		.walletTitle {
			padding: 0;
			margin: 0;
			font-size: 15px;
		}

		.value {
			display: block;
            font-weight: 500;
			line-height: 1;
            font-weight: 300;
			padding: 0;
			margin: 0;

			span {
				top: 1px;
				position: relative;
                font-size: 13px;
				vertical-align: top;
			}

			span.bigger {
				top: 0;
				font-size: 15px;
				margin: 0px -3px;
			}
		}

		.title {
			font-size: 12px;
            line-height: 1.26;
			text-transform: uppercase;
			vertical-align: top;
			font-weight: 700;
			padding: 0;
			margin: 0;
		}
	}
`;

class PortfolioPieChart extends React.Component {

   componentDidMount() {

   }

   render() {
      const {
         [STORE_KEYS.YOURACCOUNTSTORE]: youraccountStore,
      } = this.props;
      const title = youraccountStore.portfolioPieChartTitle;
      const data = youraccountStore.portfolioPieChartData;
      const [full, part] = title.split('.');

      return (
         <AutoSizer>
            {({width, height}) => {
               return (
                  <AccountsDiagramWrap height={height} width={width}>
                     {/*<CircleChartText>*/}
                     {/*<svg className="sprite-icon" role="img" aria-hidden="true"*/}
                     {/*dangerouslySetInnerHTML={{__html: renderSvg('wallet')}}/>*/}
                     {/*<div className="wrap">*/}
                     {/*<p className="value">*/}
                     {/*<span>$ </span>*/}
                     {/*<span className="bigger totalBalanceTrunc">{full}</span>*/}
                     {/*<span className="totalBalanceFraction"> .{!part ? '00' : part}</span>*/}
                     {/*</p>*/}
                     {/*<p className="title">Total balance</p>*/}
                     {/*</div>*/}
                     {/*</CircleChartText>*/}

                     <HighchartsReact
                        className="accounts-diagram"
                        highcharts={Highcharts}
                        options={initConfig(roundData(data), height, width)}
                     />
                  </AccountsDiagramWrap>
               )
            }}
         </AutoSizer>
      )
   }
}

export default inject(
   STORE_KEYS.YOURACCOUNTSTORE
)(observer(PortfolioPieChart));
