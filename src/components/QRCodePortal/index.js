import React from 'react';

export default class QRCodePortal extends React.Component {
    constructor(props) {
        super(props);
        this.el = document.createElement('div');
    }

    componentDidMount() {
        this.QRRoot = document.body;
        this.QRRoot.appendChild(this.el);

        this.el.id = this.props.id;
        this.el.className = this.props.className;
        this.el.style.position = 'absolute';
        this.el.style.transformOrigin = 'top left';
        this.el.style.zIndex = 100000;
        this.el.style.transformStyle = 'preserve-3d';
        this.el.style.perspective = '1000px';

        this.refreshQR();

        window.addEventListener('resize', this.refreshQR);
    }

    componentWillReceiveProps(props) {
        if (props.className !== this.props.className) {
            this.el.className = props.className;
        }
    }

    componentWillUnmount() {
        this.QRRoot.removeChild(this.el);
        window.removeEventListener('resize', this.refreshQR);
    }

    refreshQR = () => {
        const depositEl = document.getElementById(this.props.wrapperId);
        const wrapperEl = depositEl.closest('.ReactVirtualized__Table__rowColumn');
        const pos = wrapperEl.getBoundingClientRect();
        this.el.style.left = (pos.left - 1) + 'px';
        this.el.style.top = pos.top + 'px';
        if (window.innerWidth > 1500) {
            this.el.style.transform = 'scale(1)';
        } else {
            this.el.style.transform = 'scale(0.75)';
        }
        this.el.style.transformOrigin = 'right top';
    };

    render() {
        return ReactDOM.createPortal(
            this.props.children,
            this.el,
        );
    }
}