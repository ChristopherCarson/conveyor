"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Header = exports.THead = void 0;

var _react = _interopRequireDefault(require("react"));

var _schemaGetters = require("../utils/schemaGetters");

var _Table = require("./Table");

var R = _interopRequireWildcard(require("ramda"));

var _isType = require("../utils/isType");

var _Filter = require("./Filter");

var _Sort = require("./Sort");

var _Utils = require("../Utils");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var THead = function THead(_ref) {
  var schema = _ref.schema,
      modelName = _ref.modelName,
      fieldOrder = _ref.fieldOrder,
      editable = _ref.editable,
      deletable = _ref.deletable,
      detailField = _ref.detailField,
      data = _ref.data,
      tableOptions = _ref.tableOptions,
      sortable = _ref.sortable,
      fromIndex = _ref.fromIndex,
      customProps = _ref.customProps;
  var actions = (0, _schemaGetters.getActions)(schema, modelName);
  var onSort = R.path(['tableOptions', 'sort'], actions);
  return _react["default"].createElement("thead", null, _react["default"].createElement("tr", null, fieldOrder.map(function (fieldName, idx) {
    if (fromIndex === true) {
      var displayCondition = R.prop('index', (0, _schemaGetters.getFieldConditions)(schema, modelName, fieldName));

      if ((0, _Utils.shouldDisplay)({
        schema: schema,
        modelName: modelName,
        fieldName: fieldName,
        displayCondition: displayCondition,
        customProps: customProps
      }) === false) {
        return null;
      }
    }

    var isRelField = (0, _isType.isRel)((0, _schemaGetters.getField)(schema, modelName, fieldName));
    var sortKeyObj = R.path(['sort', modelName], tableOptions);
    return _react["default"].createElement("th", {
      key: idx,
      style: {
        minWidth: '130px'
      }
    }, _react["default"].createElement(Header, {
      modelName: modelName,
      fieldName: fieldName,
      title: (0, _schemaGetters.getFieldLabel)({
        schema: schema,
        modelName: modelName,
        fieldName: fieldName,
        data: data,
        customProps: customProps
      }),
      // this is the actual 'data' list, not 'node'
      onSort: onSort,
      showSort: tableOptions && sortable && (0, _Sort.isSortable)({
        schema: schema,
        modelName: modelName,
        fieldName: fieldName
      }) ? !isRelField : false,
      sortKeyObj: sortKeyObj
    }));
  }), (0, _Table.showButtonColumn)({
    deletable: deletable,
    editable: editable,
    detailField: detailField
  }) && _react["default"].createElement("th", {
    className: "table_btn_col"
  })));
};

exports.THead = THead;

var Header = function Header(_ref2) {
  var modelName = _ref2.modelName,
      fieldName = _ref2.fieldName,
      title = _ref2.title,
      onSort = _ref2.onSort,
      showSort = _ref2.showSort,
      sortKeyObj = _ref2.sortKeyObj;
  return _react["default"].createElement("div", {
    className: "header"
  }, _react["default"].createElement("div", {
    className: "title"
  }, _react["default"].createElement("a", {
    style: {
      "float": 'left',
      fontSize: '.9em'
    },
    href: '#'
  }, title), _react["default"].createElement("div", {
    className: 'header-overflow'
  }, showSort && _react["default"].createElement(_Sort.SortButton, {
    modelName: modelName,
    fieldName: fieldName,
    onSort: onSort,
    sortKeyObj: sortKeyObj
  }))));
};

exports.Header = Header;