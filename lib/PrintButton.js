"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _printJs = _interopRequireDefault(require("print-js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var PrintButton = function PrintButton(_ref) {
  var url = _ref.url;
  return _react["default"].createElement("button", {
    onClick: function onClick() {
      return (0, _printJs["default"])({
        printable: url,
        documentTitle: 'Image',
        type: 'image',
        style: 'img {display: block; margin: auto;}'
      });
    },
    className: "btn btn-sm btn-outline-success",
    style: {
      marginTop: '5px'
    },
    role: "button"
  }, "Print");
};

var _default = PrintButton;
exports["default"] = _default;