import {observable, action, computed, reaction} from "mobx"
import fuzzySearch from 'fuzzaldrin-plus';
import {CoinsRequest} from 'bct-ui-satori';
import {ProgramId} from '../config/constants'

const maxResults = 100;
const getSuggestions = (query, items) => fuzzySearch.filter(items, query, {maxResults});

const defaultBase = 'ETH';
const defaultQuote = 'BTC';

const getQuotesForBase = Coin => CoinsRequest({ProgramId, Coin});
const getBases = () => CoinsRequest({ProgramId, Coin:'*'});

const getNextSelectedQuote = (prevQuote, quotes) => quotes.find(x=>x===prevQuote) || quotes[0];

class InstrumentStore {
    @observable Bases = [];
    @observable Quotes = [];

    @observable selectedBase = null;
    @observable selectedQuote = null;
    
    constructor(){
        this.getBaseSuggestions = this.getBaseSuggestions.bind(this);
        this.getQuoteSuggestions = this.getQuoteSuggestions.bind(this);
        this.__setDefaultBasesQuotes();
    }

    async __setDefaultBasesQuotes(){
        this.Bases = await getBases();
        this.Quotes = await getQuotesForBase(defaultBase);
        this.setBaseSync(defaultBase);
        this.setQuote(defaultQuote);
    }

    @computed({
        equals: ([prevBase, prevQuote], [nextBase, nextQuote]) => {
            if (!(nextBase && nextQuote) && !(prevBase && prevQuote)) return true;
            return nextBase === nextQuote;
        }
    })
    get selectedInstrumentPair() {
        return [this.selectedBase, this.selectedQuote];
    }

    @action.bound
    setBaseSync(base){
        this.selectedBase = base;
    }

    @action.bound
    async setBase(base) { 
        this.selectedBase = base;
        this.Quotes = await getQuotesForBase(this.selectedBase);
        this.setQuote(getNextSelectedQuote(this.selectedQuote, this.Quotes));
    }
    
    @action.bound 
    setQuote(quote) { 
        this.selectedQuote = quote;
    }

    getBaseSuggestions(query) {
        return getSuggestions(query, this.Bases);
    }

    getQuoteSuggestions(query) {
        return getSuggestions(query, this.Quotes);
    }

    instrumentsReaction(reactionHandler, fireImmediately=false){
        return reaction(
            () => this.selectedInstrumentPair,
            ([base, quote]) => {
                if (base && quote) {               
                    reactionHandler(base, quote);
                }
            },
            {fireImmediately}
        )
    }
    
}

export default () => {
    const store = new InstrumentStore();
    return store;
}