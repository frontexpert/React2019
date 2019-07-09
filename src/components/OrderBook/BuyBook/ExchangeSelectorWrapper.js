import React from 'react';
import styled from 'styled-components';
import { inject, observer } from 'mobx-react';

import { STORE_KEYS } from '../../../stores';
import ExchangeSelector from '../../PayApp/PayWindow/Header/ExchangeSelector';

const Wrapper = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    margin: 0;
    margin-left: 15px;
    border: none;
    padding: 0;
    ${props => props.settingsOpen && 'position: relative;'}
`;

class ExchangeSelectorWrapper extends React.Component {
    state = {};
    ref = React.createRef();

    onSelectExchange = (exchange) => {
        const {
            [STORE_KEYS.EXCHANGESSTORE]: { setExchange },
        } = this.props;

        setExchange(exchange);
    };

    render() {
        const {
            [STORE_KEYS.EXCHANGESSTORE]: {
                marketExchanges,
                selectedExchange,
                exchanges,
                setExchangeActive,
                setExchangeApiSynced,
                selectExchangeActive,
            },
            [STORE_KEYS.MODALSTORE]: {
                Modal,
                isApiKeyModalOpened,
            },
            isEnabled,
            wrapperWidth,
            wrapperHeight,
            isLoggedIn,
            settingsOpen,
            setChildOpen,
        } = this.props;

        let mExchanges = [{
            name: 'Global',
        }];
        mExchanges = mExchanges.concat(marketExchanges);

        return (
            <Wrapper className="exchange-sibling" settingsOpen={settingsOpen}>
                <ExchangeSelector
                    isEnabled={isEnabled}
                    value={selectedExchange.name}
                    items={mExchanges}
                    exchanges={exchanges}
                    setExchangeActive={setExchangeActive}
                    setExchangeApiSynced={setExchangeApiSynced}
                    selectExchangeActive={selectExchangeActive}
                    modal={Modal}
                    isApiKeyModalOpened={isApiKeyModalOpened}
                    onChange={this.onSelectExchange}
                    width={wrapperWidth}
                    height={wrapperHeight}
                    isLoggedIn={isLoggedIn}
                    ref={this.ref}
                    setChildOpen={setChildOpen}
                    settingsOpen={settingsOpen}
                />
            </Wrapper>
        );
    }
}

export default inject(
    STORE_KEYS.EXCHANGESSTORE,
    STORE_KEYS.MODALSTORE,
)(observer(ExchangeSelectorWrapper));
