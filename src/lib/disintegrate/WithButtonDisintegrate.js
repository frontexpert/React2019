import disintegrate from "./index";
import {compose, lifecycle, mapProps, withHandlers} from "recompose";

export const withButtonDisintegrate = compose(
    lifecycle({
        componentDidMount() {
            disintegrate.init();
        },
    }),
    withHandlers({
        handleDisintegrate: ({orderButtonText}) => () => {
            disintegrate.dises.forEach(function (disObj) {
                if (disObj.elem.dataset.disType === "simultaneous" && disObj.elem.textContent === orderButtonText) {
                    disintegrate.createSimultaneousParticles(disObj);
                }
            });
        },
    })
);

export const withAddDisintegrateToOnClickEventIfPresent = mapProps(({handleDisintegrate, onClick, ...rest}) => ({
    onClick: (event) => {
        handleDisintegrate(event);
        !!onClick && onClick(event);
    },
    ...rest,
}));