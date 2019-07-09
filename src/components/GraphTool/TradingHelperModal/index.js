import React from 'react';
import {
    ModalWrapper,
    Modal,
    Instruction,
    Slider,
    ControlWrapper,
    SkipButton,
    PrevButton,
    NextButton,
    PrevIcon,
    NextIcon,
    Indicator,
    IndicatorSelected,
    StatusModal,
    StatusSection,
    IncreasedIcon,
    DecreasedIcon,
    PluseIcon,
    MinusIcon
} from './components';

class TradingHelperModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            stepCurrent: 0,
            helpContents: [
                'Test a look at the current asset price and its\n' +
                'history. Try to forecast the price change before\n' +
                'the price indic',
                'Hello Take a look at the current asset price and its\n' +
                'history. Try to forecast the price change before\n' +
                'the price ',
                'Take a look at the current asset price and its\n' +
                'history. Try to forecast the price change before\n' +
                'the price indicator reaches the Time until\n' +
                'purchase vertical line. Go to next step to place\n' +
                'your trade.',
                'Take a look at the current asset price and its\n' +
                'history. Try to forecast the price change before\n' +
                'the price indicator reaches the Time until\n' +
                'purchase vertical line. Go to next step to place\n' +
                'your trade.',
                'Take a look at the current asset price and its\n' +
                'history. Try to forecast the price change before\n' +
                'the price indicator reaches the Time until\n' +
                'purchase vertical line. Go to next step to place\n' +
                'your trade.'
            ],
            tradeStatus: {
                decreased: {
                    amount: 780,
                    percentage: 30,
                },
                increased: {
                    amount: 120,
                    percentage: 13,
                },
                purchaseTime: '00:53',
                amount: 600,
                strikePrice: 5995.24,
            },
        };
    }

    nextStep = () => {
        const { stepCurrent, helpContents } = this.state;
        if (stepCurrent <  helpContents.length - 1) {
            this.setState({ stepCurrent: stepCurrent + 1 });
        }
    };
    prevStep = () => {
        const { stepCurrent } = this.state;
        if (stepCurrent >  0) {
            this.setState({ stepCurrent: stepCurrent - 1 });
        }
    };
    render() {
        const { helpContents, stepCurrent, tradeStatus } = this.state;
        const { onCloseTradingHelperModal } = this.props;
        return (
            <ModalWrapper>
                <Modal>
                    <Instruction>
                        {helpContents[stepCurrent]}
                    </Instruction>
                    <Slider>
                        {helpContents.map((item, key) => {
                            return (key === stepCurrent ? (<IndicatorSelected key={key}/>) : (<Indicator key={key}/>));
                        })}
                    </Slider>
                    <ControlWrapper>
                        <SkipButton onClick={onCloseTradingHelperModal}>
                            <span>Skip</span>
                        </SkipButton>
                        <PrevButton onClick={this.prevStep}>
                            <PrevIcon/>
                            <span>Back</span>
                        </PrevButton>
                        <NextButton onClick={this.nextStep}>
                            <span>Next</span>
                            <NextIcon/>
                        </NextButton>
                    </ControlWrapper>
                </Modal>
                <StatusModal>
                    <StatusSection className="percentage-section decreased">
                        <span>{tradeStatus.decreased.amount > 0 ? '+' : '-'}${tradeStatus.decreased.amount}</span>
                        <div className="status-button">
                            <DecreasedIcon/>
                            <span>{tradeStatus.decreased.percentage}%</span>
                        </div>
                    </StatusSection>
                    <StatusSection>
                        <span>Time until purchase</span>
                        <div className="status-button">
                            <div className="space-between">
                                <span>M1</span>
                                <span>{tradeStatus.purchaseTime}</span>
                            </div>
                            <div className="amount-control">
                                <MinusIcon/>
                                <PluseIcon/>
                            </div>
                        </div>
                    </StatusSection>
                    <StatusSection>
                        <span>Trade amount</span>
                        <div className="status-button">
                            <span>${tradeStatus.amount}</span>
                            <div className="amount-control">
                                <MinusIcon/>
                                <PluseIcon/>
                            </div>
                        </div>
                    </StatusSection>
                    <StatusSection>
                        <span>Strike price</span>
                        <div className="status-button">
                            <span>{tradeStatus.strikePrice}</span>
                            <div className="amount-control">
                                <MinusIcon/>
                                <PluseIcon/>
                            </div>
                        </div>
                    </StatusSection>
                    <StatusSection className="percentage-section increased">
                        <span>{tradeStatus.increased.amount > 0 ? '+' : '-'}${tradeStatus.increased.amount}</span>
                        <div className="status-button">
                            <span>{tradeStatus.increased.percentage}%</span>
                            <IncreasedIcon/>
                        </div>
                    </StatusSection>
                </StatusModal>
            </ModalWrapper>
        );
    }
}
export default TradingHelperModal;