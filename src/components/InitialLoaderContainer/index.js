import React from 'react';
import { inject, observer } from 'mobx-react';

import InitialLoader from '../../components-generic/InitialLoader';
import { STORE_KEYS } from '../../stores';
import ProgressRing from '../PayApp/ProgressRing';

class InitialLoaderContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loadFailed: false,
            isLoaded: false,
        };
        this.timer = setTimeout(this.updateLoadFailed, 30000);
    }

    componentWillUnmount() {
        clearTimeout(this.timer);
    }

    setLoaded = (isLoaded) => {
        this.setState({
            isLoaded,
        });
    };

    updateLoadFailed = () => {
        const {
            isTelegramLoaded,
            isBaseQuotesLoaded,
            isAccountStoreLoaded,
        } = this.props;

        if (!isTelegramLoaded || !isAccountStoreLoaded) {
            this.setState({
                loadFailed: true,
            });

            setTimeout(() => {
                this.setState({
                    isLoaded: true,
                });
            }, 300);
        }
    };

    render() {
        const {
            [STORE_KEYS.YOURACCOUNTSTORE]: yourAccountStore,
            [STORE_KEYS.TELEGRAMSTORE]: telegramStore,
            [STORE_KEYS.INSTRUMENTS]: instrumentStore,
            isMobileDevice,
        } = this.props;
        const { isLoaded : isTelegramLoaded } = telegramStore;
        const { isLoaded : isBaseQuotesLoaded } = instrumentStore;
        const { isLoaded : isAccountStoreLoaded } = yourAccountStore;
        const { loadFailed, isLoaded } = this.state;

        return (
            <React.Fragment>
                {isMobileDevice ? (
                    !isLoaded && (
                        <ProgressRing
                            radius={160}
                            stroke={4}
                            setLoaded={this.setLoaded}
                        />
                    )
                ) : (
                    !(loadFailed || (isTelegramLoaded && isBaseQuotesLoaded && isAccountStoreLoaded)) && (
                        <InitialLoader/>
                    )
                )}
            </React.Fragment>
        );
    }
}

export default inject(
    STORE_KEYS.TELEGRAMSTORE,
    STORE_KEYS.YOURACCOUNTSTORE,
    STORE_KEYS.INSTRUMENTS,
)(observer(InitialLoaderContainer));
