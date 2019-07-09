import React, { Component, Fragment } from 'react';

import { claimModeKeys, contentModeKeys } from '../../../../stores/PayWindowStore';
import { HeaderWrapper, LabelDeposit } from '../Components';
import CurrencyDropdownWithSymbol from '../../../../components-generic/CurrencyDropdown/CurrencyDropdownWithSymbol';
import { BackIcon, ClockIcon, ScanIcon } from '../icons/index';
import { RefreshIcon } from '../Header/Components';
import { payViewModeKeys } from '../../../../stores/PayAppStore';

class CashHeader extends Component {
    goToBack = () => {
        const {
            switchContentView, setClaimNotify, switchAppContentView,
        } = this.props;

        switchContentView(contentModeKeys.numPadModeKey);
        setClaimNotify(claimModeKeys.initialModeKey);
        switchAppContentView(payViewModeKeys.payChooseModeKey);
    };

    refresh = () => {
        window.location.reload();
    };

    render() {
        const {
            contentMode, switchContentView, balanceMaxValue, isDefaultCrypto,
        } = this.props;

        return (
            <HeaderWrapper isHistoryMode={contentMode === contentModeKeys.historyModeKey}>
                <div className="left">
                    <BackIcon onClick={this.goToBack} />
                </div>

                <div className="center">
                    {contentMode === contentModeKeys.historyModeKey && (
                        <LabelDeposit
                            isClickable={false}
                            isDefaultCrypto={isDefaultCrypto}
                        >
                            <CurrencyDropdownWithSymbol alignRight={false} alignTop={false} isDisabled={true} isClickable={false} />
                            <span>{balanceMaxValue}</span>
                        </LabelDeposit>
                    )}
                </div>

                {
                    contentMode !== contentModeKeys.historyModeKey &&
                    contentMode !== contentModeKeys.depositModeKey &&
                    contentMode !== contentModeKeys.qrScanModeKey &&
                    contentMode !== contentModeKeys.qrScannerModeKey &&
                        <div className="right">
                            <ClockIcon onClick={() => switchContentView(contentModeKeys.historyModeKey)} />
                        </div>
                }

                {contentMode === contentModeKeys.qrScanModeKey && (
                    <div className="right">
                        <RefreshIcon
                            onClick={this.refresh}
                        />
                    </div>
                )}
            </HeaderWrapper>
        );
    }
}

export default CashHeader;
