/*
 * wavy-svg v1.1.0
 * (c) 2019 Menyou
 * Released under the MIT License.
 */
var WavySvg = (function () {
  'use strict';

  

  function __$styleInject(css) {
      if (!css) return;

      if (typeof window == 'undefined') return;
      var style = document.createElement('style');
      style.setAttribute('media', 'screen');

      style.innerHTML = css;
      document.head.appendChild(style);
      return css;
  }

  function _typeof(obj) {
    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function creatSvgPath(_ref) {
    var width = _ref.width,
        height = _ref.height,
        curve = _ref.curve;
    var x = 0;
    var y = height / 2;
    var path = "M0,".concat(y, " ");
    var unit = width / 8;

    while (x < width) {
      path += 'Q' + "".concat(x + unit, ",").concat(y + curve, " ").concat(x + 2 * unit, ",").concat(y, " ");
      x = x + 2 * unit;
      curve = curve * -1;
    }

    return path + "L".concat(width, ",0 ").concat(width, ",").concat(height, " 0,").concat(height);
  }
  var isDOM = (typeof HTMLElement === "undefined" ? "undefined" : _typeof(HTMLElement)) === 'object' ? function (dom) {
    return dom instanceof HTMLElement;
  } : function (dom) {
    return dom && _typeof(dom) === 'object' && dom.nodeType === 1 && typeof dom.nodeName === 'string';
  };
  function getClientSize(dom) {
    return {
      width: dom.clientWidth,
      height: dom.clientHeight
    };
  }
  function warn(message) {
    console.warn(message);
  }
  function hexToRgb(hex) {
    var rgb = [];
    var length = hex.length;
    var temp = parseInt((length - 1) / 3);

    for (var i = 1; i < length; i += temp) {
      rgb.push(parseInt('0x' + hex.slice(i, i + temp)));
    }

    return rgb;
  }

  function getRGBValue() {
    var rgb = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var match = rgb.replace(/\s+/g, '').match(/^(?:rgb(?:a)?)\(([\d(\.\d*),]*)\)$/);
    return match ? match[1].split(',') : null;
  }

  function getColorValue(color) {
    var res = [];

    if (color.startsWith('rgb')) {
      res = getRGBValue(color);
    } else if (color.startsWith('#')) {
      res = hexToRgb(color);
    } else {
      return null;
    }

    return res.map(function (v) {
      return Number(v);
    });
  }

  function getStepColor(_ref2) {
    var start = _ref2.start,
        end = _ref2.end,
        total = _ref2.total,
        step = _ref2.step;

    if (start === end) {
      return start;
    } // 将 hex 转换为 rgb


    var sColor = getColorValue(start);
    var eColor = getColorValue(end);

    if (sColor && eColor) {
      var p = step / total; // 计算 R\G\B 每一步的差值

      var rStep = eColor[0] - sColor[0];
      var gStep = eColor[1] - sColor[1];
      var bStep = eColor[2] - sColor[2];
      var opacity = (eColor[3] || 1) - (sColor[3] || 1);
      return "rgba(".concat(rStep * p + sColor[0], ", ").concat(gStep * p + sColor[1], ", ").concat(bStep + sColor[2], ", ").concat(opacity * p + (sColor[3] || 1), ")");
    } else {
      return null;
    }
  }
  function createElementNS(tagName) {
    return document.createElementNS('http://www.w3.org/2000/svg', tagName);
  }

  var SVG_NAME = 'wave-svg';
  var WRAP_CLASS = 'wavy-svg-wrap';
  var STOP_CLASS = 'wavy-svg-stop';
  var SVG_MAIN_CLASS = 'wavy-svg-container';
  var SVG_BASE_CLASS = 'wavy-svg-container-base';

  __$styleInject(".wavy-svg-wrap {\n  position: relative;\n  overflow: hidden;\n  z-index: 0;\n}\n.wavy-svg-wrap.wavy-svg-stop .wavy-svg-container {\n  transform: scaleY(0.18);\n}\n.wavy-svg-container {\n  position: absolute;\n  transform-origin: 50% 100%;\n  transition: transform 1s ease;\n  transform: scaleY(1);\n}\n.wavy-svg-container svg {\n  animation-name: WavySvgSlideToLeft;\n  animation-iteration-count: infinite;\n  animation-timing-function: cubic-bezier(0.22, 0.33, 0.86, 0.76);\n  vertical-align: middle;\n}\n.wavy-svg-container-base {\n  position: absolute;\n  bottom: 0;\n  right: 0;\n  left: 0;\n}\n@keyframes WavySvgSlideToLeft {\n  0% {\n    transform: translateX(0);\n  }\n  100% {\n    transform: translateX(-50%);\n  }\n}\n");

  var id = 1;
  var defaultOptions = {
    waveHeight: 20,
    baseHeight: 0,
    color: 'transparent',
    delay: 0,
    duration: 2000 // curve: 10

  };

  var WavySvg =
  /*#__PURE__*/
  function () {
    // 0: stop, 1: active
    // svg wrap element
    function WavySvg(_el) {
      var _this = this;

      var _options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      _classCallCheck(this, WavySvg);

      _defineProperty(this, "status", 1);

      _defineProperty(this, "wrap", null);

      _defineProperty(this, "size", {
        width: 0,
        height: 0
      });

      _defineProperty(this, "initWrap", function (el) {
        if (!isDOM(el)) {
          warn('el is not a HTMLElement');
          return;
        }

        var _getClientSize = getClientSize(el),
            width = _getClientSize.width,
            height = _getClientSize.height;

        _this.wrap = createWrap(_this.size = {
          width: width,
          height: height
        });
      });

      _defineProperty(this, "createWave", function (options) {
        if (!_this.wrap) {
          return;
        }

        for (var i = 0, l = options.length; i < l; i++) {
          var _this$size$width = _this.size.width,
              width = _this$size$width === void 0 ? 0 : _this$size$width; // 默认值处理

          var option = Object.assign({
            width: width
          }, defaultOptions, options[i]);
          var baseHeight = option.baseHeight,
              waveHeight = option.waveHeight,
              color = option.color,
              endColor = option.endColor,
              curve = option.curve; // curve 默认值设置

          if (!curve) {
            option.curve = curve = !isNaN(waveHeight) ? waveHeight / 2 : 0;
          }

          if (!endColor) {
            option.endColor = endColor = color;
          }

          option.middleColor = getStepColor({
            start: color,
            end: endColor,
            total: waveHeight + baseHeight,
            step: waveHeight
          });
          var base = createBase(option);
          var svg = createSvg(option);

          _this.wrap.append(svg);

          _this.wrap.append(base);

          id++;
        }
      });

      if (_el && _options) {
        this.initWrap(_el);
        this.createWave(_options instanceof Array ? _options : [_options]);

        _el.append(this.wrap);
      } else {
        warn('illegal parameters');
      }
    }

    _createClass(WavySvg, [{
      key: "run",
      value: function run() {
        if (this.status === 0) {
          this.status = 1;
          this.wrap.classList.remove(STOP_CLASS);
        }
      }
    }, {
      key: "stop",
      value: function stop() {
        if (this.status === 1) {
          this.status = 0;
          this.wrap.classList.add(STOP_CLASS);
        }
      }
    }]);

    return WavySvg;
  }();

  function createWrap(_ref) {
    var _ref$width = _ref.width,
        width = _ref$width === void 0 ? 0 : _ref$width,
        _ref$height = _ref.height,
        height = _ref$height === void 0 ? 0 : _ref$height;
    var wrap = document.createElement('div');
    wrap.setAttribute('class', WRAP_CLASS);
    wrap.setAttribute('style', "width: ".concat(width, "px;height: ").concat(height, "px;"));
    return wrap;
  }

  function createBase(_ref2) {
    var baseHeight = _ref2.baseHeight,
        color = _ref2.color,
        endColor = _ref2.endColor,
        middleColor = _ref2.middleColor;
    var base = document.createElement('div');
    base.setAttribute('class', SVG_BASE_CLASS);

    if (middleColor && endColor !== middleColor) {
      endColor = "linear-gradient(to bottom, ".concat(middleColor, ", ").concat(endColor, ")");
    }

    base.setAttribute('style', "height: ".concat(baseHeight, "px;background:").concat(endColor, ";z-index: ").concat(id));
    return base;
  }

  function createSvg(_ref3) {
    var width = _ref3.width,
        waveHeight = _ref3.waveHeight,
        baseHeight = _ref3.baseHeight,
        color = _ref3.color,
        middleColor = _ref3.middleColor,
        curve = _ref3.curve,
        delay = _ref3.delay,
        duration = _ref3.duration;
    var name = "".concat(SVG_NAME, "-").concat(id);
    var wrap = document.createElement('div');
    wrap.setAttribute('class', SVG_MAIN_CLASS);
    wrap.setAttribute('data-svg-name', name);
    wrap.setAttribute('style', "bottom: ".concat(baseHeight, "px;z-index:").concat(id));
    var svg = createElementNS('svg');
    svg.setAttribute('width', width * 2 + 'px');
    svg.setAttribute('height', waveHeight + 'px');
    svg.setAttribute('style', "animation-duration:".concat(duration / 1000, "s;animation-delay:").concat(delay / 1000, "s"));
    var defs = createElementNS('defs');
    var linearGradient = createElementNS('linearGradient');
    linearGradient.setAttribute('id', name);
    linearGradient.setAttribute('x1', '0');
    linearGradient.setAttribute('y1', '0');
    linearGradient.setAttribute('x2', '0');
    linearGradient.setAttribute('y2', '100%');
    var stop1 = createElementNS('stop');
    stop1.setAttribute('offset', '0');
    stop1.setAttribute('stop-color', color);
    var stop2 = createElementNS('stop');
    stop2.setAttribute('offset', '100%');
    stop2.setAttribute('stop-color', middleColor || color);
    var path = createElementNS('path');
    path.setAttribute('d', creatSvgPath({
      width: width * 2,
      height: waveHeight,
      curve: curve
    }));
    path.setAttribute('fill', "url(#".concat(name, ")"));
    linearGradient.appendChild(stop1);
    linearGradient.appendChild(stop2);
    defs.appendChild(linearGradient);
    svg.appendChild(defs);
    svg.appendChild(path);
    wrap.appendChild(svg);
    return wrap;
  }

  return WavySvg;

}());
