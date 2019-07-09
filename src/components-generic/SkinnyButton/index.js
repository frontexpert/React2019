import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import styled from 'styled-components';

const StyledSkinnyButton = styled(Button)`
    color: ${props => props.theme.palette.contrastText};
    background: ${props => props.theme.palette.portfolioComps};
`;

const styles = {
    root: {
      border: 0,
      padding: '0 18px',
      fontSize: '.75rem',
      minHeight: '1.3rem',
    },
  };

const StyledButton = ({buttonText, classes, onClick}) => {
    return (
        <StyledSkinnyButton classes={{root: classes.root}} onClick={onClick}>
            {buttonText}
        </StyledSkinnyButton>
    )
};

export default withStyles(styles)(StyledButton);