import {BCTSession} from 'bct-ui-satori';
import {ProgramId} from '../config/constants';

class SessionStore {
    inited=false
    
    constructor(instrumentStore) {
        instrumentStore.instrumentsReaction(
            (base, quote) => {
                this.inited = true;               
                BCTSession({Symbols: [`${base}-${quote}`], ProgramId})
            },
            true
        )
        this.__checkInited();
    }

    __checkInited(){
        let hn = setTimeout(() => {
            if (!this.inited) console.error('BCTSession not started!');
            clearTimeout(hn);
        }, 15000);
    }
}

export default (instrumentStore) => {
    const store = new SessionStore(instrumentStore);
    return store;
}