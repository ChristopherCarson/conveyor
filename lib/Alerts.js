"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.Alerts = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Alerts = function Alerts(_ref) {
  var alerts = _ref.alerts,
      dismissAlert = _ref.dismissAlert;
  return _react["default"].createElement("div", {
    id: "alerts"
  }, alerts.map(function (alert, idx) {
    return _react["default"].createElement("div", {
      key: "alert-".concat(idx),
      className: "alert fade show alert-".concat(alert.type),
      role: "alert"
    }, alert.message, _react["default"].createElement("button", {
      type: "button",
      className: "close",
      "aria-label": "Close",
      onClick: function onClick() {
        return dismissAlert(alert);
      }
    }, "\xD7"));
  }));
};

exports.Alerts = Alerts;
var _default = Alerts;
exports["default"] = _default;