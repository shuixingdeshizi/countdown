'use strict';

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

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  }
}

function _iterableToArray(iter) {
  if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}

function formatTimes(times) {
  // 以毫秒为单位
  var days = Math.floor(times / (24 * 60 * 60 * 1000));
  var hours = formatNum(Math.floor(times % (24 * 60 * 60 * 1000) / (60 * 60 * 1000)));
  var minutes = formatNum(Math.floor(times % (24 * 60 * 60 * 1000) % (60 * 60 * 1000) / (60 * 1000)));
  var seconds = formatNum(Math.floor(times % (24 * 60 * 60 * 60 * 1000) % (60 * 60 * 1000) % (60 * 1000) / 1000));
  var milliseconds = formatNum(Math.floor(times % (24 * 60 * 60 * 1000) % (60 * 60 * 1000) % (60 * 1000) % 1000));

  function formatNum(num) {
    return num < 10 ? '0' + num : num;
  }

  return {
    days: days,
    hours: hours,
    minutes: minutes,
    seconds: seconds,
    milliseconds: milliseconds
  };
}

var Countdown =
/*#__PURE__*/
function () {
  function Countdown() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$times = _ref.times,
        times = _ref$times === void 0 ? 0 : _ref$times,
        _ref$interval = _ref.interval,
        interval = _ref$interval === void 0 ? 500 : _ref$interval,
        _ref$events = _ref.events,
        events = _ref$events === void 0 ? {} : _ref$events;

    _classCallCheck(this, Countdown);

    this.events = events;
    this.times = times;
    this.interval = interval;
  }

  _createClass(Countdown, [{
    key: "start",
    value: function start() {
      var _this = this;

      var now = Date.now();

      var step = function step() {
        if (_this.times < _this.interval) {
          setTimeout(function () {
            _this.times = 0; // 倒计时结束

            _this.trigger('change', {
              times: _this.times,
              formatTimes: formatTimes(_this.times)
            });

            _this.trigger('end', {
              times: _this.times,
              formatTimes: formatTimes(_this.times)
            });
          }, _this.times);
        } else {
          setTimeout(function () {
            var duration = Date.now() - now;
            _this.times -= duration;
            now = Date.now();

            _this.trigger('change', {
              times: _this.times,
              formatTimes: formatTimes(_this.times)
            });

            if (_this.times > 0) {
              console.log(_this.times, 'diff');
              step();
            }
          }, _this.interval);
        }
      };

      step();
    }
  }, {
    key: "on",
    value: function on(event, handler) {
      if (!this.events[event]) {
        this.events[event] = [];
      }

      this.events[event].push(handler);
    }
  }, {
    key: "off",
    value: function off(event, handler) {
      var _this2 = this;

      this.events[event].forEach(function (fn, index) {
        if (fn === handler) {
          _this2.evnets.splice(index, 1);
        }
      });
    }
  }, {
    key: "trigger",
    value: function trigger(event) {
      if (!this.events[event]) return;
      var args = Array.prototype.slice.call(arguments, 1);
      this.events[event].forEach(function (fn) {
        fn.apply(void 0, _toConsumableArray(args));
      });
    }
  }]);

  return Countdown;
}();

module.exports = Countdown;
