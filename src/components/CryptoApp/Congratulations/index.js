import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import CheckIcon from './blue_check.svg';
import CloseIcon from './cancel.svg';

import {
    Wrapper,
    CongratsClose,
    CongratsIcon,
    CongratsText
} from './Components';

const Congratulations = ({ onClose }) => (
    <Wrapper>
        <CongratsClose src={CloseIcon} onClick={onClose} />
        <CongratsIcon src={CheckIcon} />
        <CongratsText>Congratulations</CongratsText>
    </Wrapper>
);

Congratulations.propTypes = {
    onClose: PropTypes.func.isRequired,
};

export default observer(Congratulations);