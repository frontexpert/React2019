import React from 'react';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import { withStateHandlers } from 'recompose';
import Menu from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';

const withDrawerState = withStateHandlers(
    () => ({open:false}),
    {
        toggleShow: ({open}) => () => {
            return {
                open:!open,
            }
        },
    }
);

const SwipeableTemporaryDrawer = ({toggleShow, open, children}) => {
    return (
        <div>
            <IconButton onClick={toggleShow}><Menu/></IconButton>
            <SwipeableDrawer
                open={open}
                onClose={toggleShow}
                onOpen={toggleShow}
            >
                <div
                    tabIndex={0}
                    role="button"
                >
                    {children}
                </div>
            </SwipeableDrawer>
            </div>
    )
};

export default withDrawerState(SwipeableTemporaryDrawer);