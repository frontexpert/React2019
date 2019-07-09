/* eslint-disable */
/**
 * Customized qrcode-react
 */
'use strict';

const React = require('react');
const PropTypes = require('prop-types');
const ReactDOM = require('react-dom');
const qr = require('qr.js');

function getBackingStorePixelRatio(ctx) {
    return (
        ctx.webkitBackingStorePixelRatio ||
        ctx.mozBackingStorePixelRatio ||
        ctx.msBackingStorePixelRatio ||
        ctx.oBackingStorePixelRatio ||
        ctx.backingStorePixelRatio ||
        1
    );
}

let getDOMNode;
if (/^0\.14/.test(React.version)) {
    getDOMNode = function (ref) {
        return ref;
    };
} else {
    getDOMNode = function (ref) {
        return ReactDOM.findDOMNode(ref);
    };
}

function utf16to8(str) {
    let out, i, len, c;
    out = '';
    len = str.length;
    for (i = 0; i < len; i++) {
        c = str.charCodeAt(i);
        if ((c >= 0x0001) && (c <= 0x007F)) {
            out += str.charAt(i);
        } else if (c > 0x07FF) {
            out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));
            out += String.fromCharCode(0x80 | ((c >> 6) & 0x3F));
            out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
        } else {
            out += String.fromCharCode(0xC0 | ((c >> 6) & 0x1F));
            out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
        }
    }
    return out;
}

class QRCode extends React.Component {
    shouldComponentUpdate(nextProps, nextState, context) {
        const that = this;
        return Object.keys(QRCode.propTypes).some(function (k) {
            return that.props[k] !== nextProps[k];
        });
    }

    componentDidMount() {
        this.update();
    }

    componentDidUpdate() {
        this.update();
    }

    update() {
        let value = utf16to8(this.props.value);
        let qrcode = qr(value);
        let canvas = getDOMNode(this.refs.canvas);

        let ctx = canvas.getContext('2d');
        let cells = qrcode.modules;
        let tileW = this.props.size / cells.length;
        let tileH = this.props.size / cells.length;
        let scale = (window.devicePixelRatio || 1) / getBackingStorePixelRatio(ctx);
        canvas.height = canvas.width = this.props.size * scale;
        ctx.scale(scale, scale);

        const needMidPointsSquare = (cells.length >= 51);
        const midPointStart = Math.floor(cells.length / 2) - 2;
        const midPointEnd = Math.floor(cells.length / 2) + 2;

        cells.forEach(function (row, rdx) {
            row.forEach(function (cell, cdx) {
                ctx.fillStyle = cell ? this.props.fgColor : this.props.bgColor;

                let isSquare =
                    (rdx < 7 && cdx < 7) ||
                    (rdx < 7 && cdx >= cells.length - 7) ||
                    (rdx >= cells.length - 7 && cdx < 7);

                if (needMidPointsSquare) {
                    if (rdx >= midPointStart && rdx <= midPointEnd) {
                        if (
                            (cdx >= 7 - 3 && cdx < 7 + 2) ||
                            (cdx > (cells.length - 7) - 3 && cdx <= (cells.length - 7) + 2)
                        ) {
                            isSquare = true;
                        }
                    }

                    if (cdx >= midPointStart && cdx <= midPointEnd) {
                        if (
                            (rdx >= 7 - 3 && rdx < 7 + 2) ||
                            (rdx > (cells.length - 7) - 3 && rdx <= (cells.length - 7) + 2)
                        ) {
                            isSquare = true;
                        }
                    }

                    if (
                        (cdx > (cells.length - 7) - 3 && cdx <= (cells.length - 7) + 2) &&
                        (rdx > (cells.length - 7) - 3 && rdx <= (cells.length - 7) + 2)
                    ) {
                        isSquare = true;
                    }

                    if (
                        (rdx >= midPointStart && rdx <= midPointEnd) &&
                        (cdx >= midPointStart && cdx <= midPointEnd)
                    ) {
                        isSquare = true;
                    }
                }

                if (isSquare) {
                    let w = (Math.ceil((cdx + 1) * tileW) - Math.floor(cdx * tileW));
                    let h = (Math.ceil((rdx + 1) * tileH) - Math.floor(rdx * tileH));
                    let x = Math.round(cdx * tileW);
                    let y = Math.round(rdx * tileH);
                    ctx.fillRect(x, y, w, h);
                } else {
                    let w = (Math.ceil((cdx + 1) * tileW) - Math.floor(cdx * tileW));
                    let h = (Math.ceil((rdx + 1) * tileH) - Math.floor(rdx * tileH));
                    let r = w * 0.47;
                    // let r = w * 0.2;
                    let x = (Math.round(cdx * tileW) + w / 2);
                    let y = (Math.round(rdx * tileH) + h / 2);
                    ctx.beginPath();
                    ctx.arc(x, y, r, 0, 2 * Math.PI, true);
                    ctx.fill();

                    if (rdx < cells.length - 1 && cells[rdx + 1][cdx]) {
                        ctx.fillRect(x - r / 2, y, r, h);
                    }

                    if (cdx < cells.length - 1 && cells[rdx][cdx + 1]) {
                        ctx.fillRect(x, y - r / 2, w, r);
                    }
                }
            }, this);
        }, this);

        if (this.props.logo) {
            let self = this;
            let size = this.props.size;
            let image = document.createElement('img');
            image.src = this.props.logo;
            image.onload = function () {
                let dwidth = self.props.logoWidth || size * 0.2;
                let dheight = self.props.logoHeight || image.height / image.width * dwidth;
                let dx = (size - dwidth) / 2;
                let dy = (size - dheight) / 2;
                image.width = dwidth;
                image.height = dheight;
                ctx.drawImage(image, dx, dy, dwidth, dheight);
            };
        }
    }

    render() {
        return React.createElement('canvas', {
            style: { height: this.props.size, width: this.props.size },
            height: this.props.size,
            width: this.props.size,
            ref: 'canvas'
        });
    }
}

QRCode.propTypes = {
    value: PropTypes.string.isRequired,
    size: PropTypes.number,
    bgColor: PropTypes.string,
    fgColor: PropTypes.string,
    logo: PropTypes.string,
    logoWidth: PropTypes.number,
    logoHeight: PropTypes.number
};

QRCode.defaultProps = {
    size: 128,
    bgColor: '#FFFFFF',
    fgColor: '#000000',
    value: 'http://facebook.github.io/react/'
};

module.exports = QRCode;
