'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _perfectScrollbar = require('perfect-scrollbar');

var _perfectScrollbar2 = _interopRequireDefault(_perfectScrollbar);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactResizeDetector = require('react-resize-detector');

var _reactResizeDetector2 = _interopRequireDefault(_reactResizeDetector);

require('perfect-scrollbar/dist/css/perfect-scrollbar.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var overflowStyle = {
  width: '100%',
  height: '100%',
  overflow: 'hidden'
};

var scrollbarOptions = {
  minScrollbarLength: 20,
  wheelPropagation: true,
  swipePropagation: true,
  suppressScrollX: true
};

var AnyVirtualize = function (_PureComponent) {
  _inherits(AnyVirtualize, _PureComponent);

  function AnyVirtualize(props) {
    _classCallCheck(this, AnyVirtualize);

    var _this = _possibleConstructorReturn(this, (AnyVirtualize.__proto__ || Object.getPrototypeOf(AnyVirtualize)).call(this, props));

    _this.initialScrollbar = function () {
      if (_this.scrollRef) {
        _this.scrollbar = null;
        _perfectScrollbar2.default.destroy(_this.scrollRef);
        _this.scrollbar = _perfectScrollbar2.default.initialize(_this.scrollRef, scrollbarOptions);
        _this.scrollRef.addEventListener('ps-scroll-x', _this.updateScrollIndex, false);
        _this.resizeEvent();
      }
    };

    _this.updateScrollIndex = function () {
      var newScrollIndex = Math.ceil(_this.scrollRef.scrollTop / _this.props.perHeight);
      var difference = Math.abs(_this.state.scrollIndex - newScrollIndex);
      if (difference >= 1) {
        _this.setState({ scrollIndex: newScrollIndex });
      }
    };

    _this.resizeEvent = function () {
      if (_this.state.resizeEventTimer) {
        clearTimeout(_this.state.resizeEventTimer);
        _this.setState({
          resizeEventTimer: null
        });
      }
      if (_this.scrollRef) {
        var _this$scrollRef$getBo = _this.scrollRef.getBoundingClientRect(),
            currentH = _this$scrollRef$getBo.height;

        var fake = function fake() {
          if (_this.scrollRef) {
            var _this$scrollRef$getBo2 = _this.scrollRef.getBoundingClientRect(),
                height = _this$scrollRef$getBo2.height;

            if (currentH === height) {
              _this.itemsInView = Math.ceil(height / _this.props.perHeight);
              _this.setState({ height: height });
            }
          }
        };
        _this.setState({
          resizeEventTimer: setTimeout(fake, 300)
        });
      }
    };

    _this.state = {
      height: 0,
      scrollIndex: 0
    };
    _this.itemsInView = _this.state.height / props.perHeight;
    _this.totalHeight = props.children.length * props.perHeight;
    return _this;
  }

  _createClass(AnyVirtualize, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.initialScrollbar();
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      this.itemsInView = this.state.height / nextProps.perHeight;
      this.totalHeight = nextProps.children.length * nextProps.perHeight;
      this.initialScrollbar();
      if (nextProps.children.length !== this.props.children.length) {
        this.scrollRef.scrollTop = 0;
        if (this.scrollbar) this.scrollbar.update();
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this.scrollRef) {
        delete this.itemsInView;
        delete this.totalHeight;
        _perfectScrollbar2.default.destroy(this.scrollRef);
        this.scrollRef.removeEventListener('ps-scroll-x', this.updateScrollIndex, false);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var scrollIndex = this.state.scrollIndex;
      var _props = this.props,
          style = _props.style,
          className = _props.className,
          perHeight = _props.perHeight,
          children = _props.children;


      var startPosition = scrollIndex > 0 ? scrollIndex - 1 : 0;
      var top = _react2.default.createElement('div', { style: { height: Math.max(0, startPosition * perHeight) } });

      var endPosition = scrollIndex >= children.length ? children.length : startPosition + this.itemsInView + 1;
      var bottom = _react2.default.createElement('div', { style: { height: Math.max(0, this.totalHeight - endPosition * perHeight) } });

      return _react2.default.createElement(
        'div',
        {
          style: _extends({}, overflowStyle, style),
          className: className,
          ref: function ref(r) {
            return _this2.scrollRef = r;
          } },
        _react2.default.createElement(_reactResizeDetector2.default, {
          handleHeight: true,
          onResize: this.resizeEvent }),
        top,
        children.slice(startPosition, endPosition),
        bottom
      );
    }
  }]);

  return AnyVirtualize;
}(_react.PureComponent);

AnyVirtualize.defaultProps = {
  style: {},
  perHeight: 35
};
exports.default = AnyVirtualize;
module.exports = exports['default'];