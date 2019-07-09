import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

import { STORE_KEYS } from '../../../stores';
import { toFixedWithoutRounding } from '../../../utils';
// import BillsInner from './BillsInner';
import BillsInner from './BillsInnerV2';
import { Wrapper, RefWrapper } from './Components';
import BillChip from './BillChipV2';

class BillsModal extends Component {
    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    handleClickOutside = (event) => {
        const {
            [STORE_KEYS.BILLCHIPSTORE]: { isOpen },
        } = this.props;

        if (
            isOpen
            && this.parentRef && this.parentRef.contains && this.parentRef.contains(event.target)
            && this.wrapperRef && this.wrapperRef.contains && !this.wrapperRef.contains(event.target)
        ) {
            this.closePopup();
        }
    };

    closePopup = () => {
        const {
            [STORE_KEYS.BILLCHIPSTORE]: { onClosePopup },
        } = this.props;

        onClosePopup();
    };

    render() {
        const {
            [STORE_KEYS.BILLCHIPSTORE]: {
                isOpen, isFirst, position = 0,
            },
        } = this.props;

        let centerPos = 5;
        const count = Math.log10(position);
        if (count > 5) {
            centerPos = count + 1;
        }
        const newPosition = toFixedWithoutRounding(position, 10 - centerPos);

        return (isOpen || isFirst) ? (
            <Wrapper
                isVisible={isOpen}
                innerRef={ref => this.parentRef = ref}
            >
                <RefWrapper innerRef={ref => this.wrapperRef = ref}>
                    <BillsInner
                        height={window.innerHeight - 30}
                        isOpen={isOpen}
                        isFromModal
                        centerPos={centerPos}
                        newPosition={newPosition}
                        onClose={this.closePopup}
                    />
                </RefWrapper>
            </Wrapper>
        ) : null;
    }
}

export default inject(
    STORE_KEYS.BILLCHIPSTORE
)(observer(BillsModal));
