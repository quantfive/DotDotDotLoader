'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /***
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * ... loader
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @craiglu
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var DotDotDotLoader = function (_React$Component) {
  _inherits(DotDotDotLoader, _React$Component);

  function DotDotDotLoader(props) {
    _classCallCheck(this, DotDotDotLoader);

    var _this = _possibleConstructorReturn(this, (DotDotDotLoader.__proto__ || Object.getPrototypeOf(DotDotDotLoader)).call(this, props));

    _this.dotsLoader = function () {
      clearTimeout(_this.dotsLoaderTimeout);
      var nextAmount = _this.state.dotState + 1;

      if (_this.state.repeat) {
        nextAmount = (_this.state.dotState + 1) % _this.state.amount;
      }
      var nextDots;
      if (nextAmount === 0) {
        nextDots = '.';
      } else {
        nextDots = _this.state.dots + '.';
      }
      _this.setState({
        dotState: nextAmount,
        dots: nextDots
      });
      _this.dotsLoaderTimeout = setTimeout(function () {
        _this.dotsLoader();
      }, _this.state.interval);
    };

    _this.state = {
      dotState: 0,
      dots: '.',
      show: false,
      amount: 3,
      repeat: true,
      interval: 500
    };
    return _this;
  }

  _createClass(DotDotDotLoader, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (this.props.repeat !== null) {
        this.setState({
          repeat: this.props.repeat
        });
      }
      if (this.props.amount !== null) {
        this.setState({
          amount: this.props.amount
        });
      }
      if (this.state.interval !== null) {
        this.setState({
          interval: this.props.interval
        });
      }
      this.setState({
        show: this.props.show
      });
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (this.state.show !== nextProps.show) {
        this.setState({
          show: nextProps.show
        });

        if (nextProps.show) {
          this.dotsLoader();
        } else {
          clearTimeout(this.dotsLoaderTimeout);
          this.setState({
            dotState: 0,
            dots: '.'
          });
        }
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      clearTimeout(this.dotsLoaderTimeout);
    }

    /***
    * recursive function with timeout that loads in the next set of dots
    */

  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'span',
        { className: 'dotDotDotLoader' },
        this.state.show ? this.state.dots : null
      );
    }
  }]);

  return DotDotDotLoader;
}(_react2.default.Component);

exports.default = DotDotDotLoader;