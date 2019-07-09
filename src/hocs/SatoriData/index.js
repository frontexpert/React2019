import {lifecycle, withState, mapProps as _mapProps, compose} from 'recompose';
 
const identity=x=>x;
const mapToPropsIdentity=(x={})=>x;

export default ({initial = {}, observable, nextStateReducer=identity, mapToProps=mapToPropsIdentity}) => (
    compose(
        withState('channelData', 'setChannelData', initial),
        lifecycle({
            componentDidMount() {
                const {setChannelData} = this.props;
                this.willUnmount = false;
                this.subscription = observable
                    .subscribe({
                        next: (...args) => {
                            this.isWorking = true;
                            requestAnimationFrame(()=>{
                                setChannelData(
                                    prevState => {
                                        if (!this.willUnmount) {
                                            return nextStateReducer(prevState, ...args)
                                        }
                                    }
                                )
                            })
                        },
                    })
            },
            componentWillUnmount() {
                this.willUnmount = true;
                requestIdleCallback(()=>{
                    this.subscription.unsubscribe();
                }, {timeout:500})
            },
        }),
        _mapProps(
            ({channelData, setChannelData, ...rest}) => {
                return {
                    ...rest,
                    ...mapToProps(channelData),
                }
            }
        )
    )
);