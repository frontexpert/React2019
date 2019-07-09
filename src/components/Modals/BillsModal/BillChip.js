import React, { Component } from 'react';

import { unifyDigitString } from '../../../utils';
import { BillImgWrapper, BillImg } from './Components';

class BillChip extends Component {
    componentDidMount() {}

    render() {
        const {
            level,
            height,
            index,
            symbol,
            hoverable = true,
            disabled,
            deno,
            isV2,
        } = this.props;

        const unit = deno < 0 ? Math.pow(10, deno).toFixed(Math.abs(deno)) : Math.pow(10, deno);
        const publicAddr = '1F1tAaz5x1HUXrCNLbtMDqcw6o5GNn4xqX';

        return (
            <BillImgWrapper
                className="bill-chip-wrapper"
                isV2={isV2}
                width={Math.floor(height * 3192 / 1801)}
                height={height}
                disabled={disabled}
                hoverable={hoverable}
                onClick={this.props.onClick}
                innerRef={this.props.getInnerRef}
            >
                <BillImg
                    className="bill-chip-image"
                    index={index}
                    lv={level}
                    height={height}
                >
                    <div className="info">
                        <div className="label_deno">
                            {unifyDigitString(unit)} {symbol}
                        </div>
                        <div className="label_details">
                            {/*
                            <div className="label_symbol">
                                {symbol}
                            </div>
                            */}
                            <div className="label_address">
                                {publicAddr}
                            </div>
                        </div>
                    </div>
                </BillImg>
            </BillImgWrapper>
        );
    }
}

export default BillChip;
