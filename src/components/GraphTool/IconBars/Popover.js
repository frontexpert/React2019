/* eslint-disable jsx-a11y/mouse-events-have-key-events */

import React, { Fragment } from 'react'
import Popover from '@material-ui/core/Popover'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import { withStateHandlers, compose } from 'recompose'
import styled from 'styled-components'

import ToolBar from '../Styles/toolbar'


const styles = theme => ({
    paper: {
        padding: 0,
        background: 'transparent',
        // adding marginleft intentionally
        // so our popover is a bit more shifted to the right
        marginLeft: '0.8rem',
    },
    popover: {
        pointerEvents: 'none',
    },
})

const Wrapper = styled.div`
    background: ${props => props.theme.palette.clrback};
    padding: 0.5rem 1rem;
`

const Text = styled.p`
    margin: 0;
    color: ${props => props.theme.palette.clrtext};
`

const PopoverWrapper = ({
    classes,
    anchorEl,
    handlePopoverOpen,
    handlePopoverClose,
    Component,
    text,
    onClick,
}) => {
    const open = !!anchorEl
    return (
        <Fragment>
            <ToolBar.Btn onMouseEnter={handlePopoverOpen} onMouseLeave={handlePopoverClose} onClick={onClick}>
                <Component />
            </ToolBar.Btn>
            <Popover
                className={classes.popover}
                classes={{
                    paper: classes.paper,
                }}
                open={open}
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'center',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'center',
                    horizontal: 'left',
                }}
                onClose={handlePopoverClose}
                disableRestoreFocus
            >
                <Wrapper>
                    <Text>{text}</Text>
                </Wrapper>
            </Popover>
        </Fragment>
    )
}

const enchanced = compose(
    withStyles(styles),
    withStateHandlers(
        ({ anchorEl = null }) => ({
            anchorEl,
        }),
        {
            handlePopoverOpen: () => ({ target }) => ({
                anchorEl: target,
            }),
            handlePopoverClose: () => () => ({
                anchorEl: null,
            }),
        }
    )
)

export default enchanced(PopoverWrapper)
