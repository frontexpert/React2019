import {OrderTicket} from "bct-ui-satori";
import {lifecycle, compose, withState, withHandlers} from "recompose";

export const withSubmitOrderTicketOnComponentDidMount = compose(
    withState('submitOrder', 'setSubmitOrder', null),
    lifecycle({
        componentDidMount() {
            const {setSubmitOrder} = this.props;
            setSubmitOrder(() => OrderTicket({throttleMs: 45}));
        },
    }),
    withHandlers({
        submitOrder: ({submitOrder}) => async (payload) => {
            const {SubmitOrderTicket} = await submitOrder;
            SubmitOrderTicket(payload);
        },
    })
);
