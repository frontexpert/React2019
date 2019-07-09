import {withProps} from "recompose";

export const withMapSymbolsToCoinLabelProps = withProps(
    ({Symbols}) => {
        let amountCoin = "";
        let priceCoin = "";
        let totalCoin = "";

        if(Array.isArray(Symbols) && Symbols.length !== 0){
            [amountCoin, priceCoin] = Symbols[0].split("-");
            totalCoin = priceCoin;
        }

        return {
            amountCoin,
            priceCoin,
            totalCoin,
        };
    }
);