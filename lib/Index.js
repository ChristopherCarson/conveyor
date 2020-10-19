"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.DefaultIndex = exports.DefaultIndexTitle = void 0;

var _react = _interopRequireDefault(require("react"));

var _Table = require("./table/Table");

var R = _interopRequireWildcard(require("ramda"));

var _CreateButton = _interopRequireDefault(require("./CreateButton"));

var _Filter = require("./table/Filter");

var _reactRouterDom = require("react-router-dom");

var _Utils = require("./Utils");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var DefaultIndexTitle = function DefaultIndexTitle(_ref) {
  var schema = _ref.schema,
      modelName = _ref.modelName,
      selectOptions = _ref.selectOptions,
      path = _ref.path,
      data = _ref.data,
      tableView = _ref.tableView,
      customProps = _ref.customProps;
  var actions = schema.getActions(modelName);
  var onCreateClick = R.path(['create', 'onIndexCreate'], actions);

  var onClick = function onClick() {
    return onCreateClick({
      modelName: modelName,
      path: path
    });
  };

  var creatable = schema.isCreatable({
    modelName: modelName,
    data: data,
    customProps: customProps
  });
  var filterable = schema.isTableFilterable({
    modelName: modelName,
    data: data,
    customProps: customProps
  });
  var currentFilters = R.path([modelName, 'filter', 'filterValue'], tableView);
  var filterOrder = R.path([modelName, 'filter', 'filterOrder'], tableView);
  var filtersAreActive = R.path([modelName, 'filter', 'filtersAreActive'], tableView);
  return _react["default"].createElement("div", {
    style: {
      marginBottom: '10px'
    }
  }, _react["default"].createElement("h3", {
    className: "d-inline"
  }, schema.getModelLabelPlural({
    modelName: modelName,
    data: data,
    customProps: customProps
  })), filterable && _react["default"].createElement(_Filter.FilterModal, {
    schema: schema,
    modelName: modelName,
    selectOptions: selectOptions,
    data: data,
    filterOrder: filterOrder,
    filterInputs: currentFilters,
    customProps: customProps
  }), _react["default"].createElement("div", {
    className: "float-right"
  }, filterable && _react["default"].createElement(_Filter.FilterModalButton, {
    modelName: modelName,
    filtersAreActive: filtersAreActive
  }), creatable && _react["default"].createElement(_CreateButton["default"], {
    onClick: onClick
  })));
};

exports.DefaultIndexTitle = DefaultIndexTitle;

var PageNotFound = function PageNotFound() {
  return _react["default"].createElement("div", {
    id: "page-not-found",
    className: "text-center mt-5"
  }, _react["default"].createElement("h1", null, "Page Not Found"));
};

var DefaultIndex = function DefaultIndex(_ref2) {
  var schema = _ref2.schema,
      modelName = _ref2.modelName,
      data = _ref2.data,
      modalData = _ref2.modalData,
      editData = _ref2.editData,
      selectOptions = _ref2.selectOptions,
      path = _ref2.path,
      tooltipData = _ref2.tooltipData,
      tableView = _ref2.tableView,
      customProps = _ref2.customProps,
      summary = _ref2.summary;

  if (!schema.getHasIndex(modelName) || R.isNil(schema.getModel(modelName))) {
    return _react["default"].createElement(PageNotFound, null);
  }

  var IndexTitleOverride = schema.getIndexTitleOverride(modelName);
  var IndexPageOverride = schema.getIndexPageOverride(modelName);
  var IndexTitle = IndexTitleOverride || DefaultIndexTitle;
  var IndexPage = IndexPageOverride || _Table.Table;
  var fieldOrder = schema.getIndexFields({
    modelName: modelName,
    data: data,
    customProps: customProps
  });
  var actions = schema.getActions(modelName);
  var onDelete = R.path(['delete', 'onIndexDelete'], actions);
  var onEditSubmit = R.path(['edit', 'onIndexEditSubmit'], actions);

  if ((0, _Utils.skipOverride)(IndexTitleOverride) && (0, _Utils.skipOverride)(IndexPageOverride)) {
    return null;
  }

  return _react["default"].createElement("div", {
    className: "container"
  }, (0, _Utils.skipOverride)(IndexTitleOverride) ? null : _react["default"].createElement(IndexTitle, {
    schema: schema,
    modelName: modelName,
    data: data,
    modalData: modalData,
    editData: editData,
    selectOptions: selectOptions,
    path: path,
    tooltipData: tooltipData,
    tableView: tableView,
    customProps: customProps
  }), (0, _Utils.skipOverride)(IndexPageOverride) ? null : _react["default"].createElement(IndexPage, {
    schema: schema,
    modelName: modelName,
    data: data,
    modalData: modalData,
    editData: editData,
    selectOptions: selectOptions,
    tooltipData: tooltipData,
    tableView: tableView,
    customProps: customProps,
    fieldOrder: fieldOrder,
    fromIndex: true,
    onDelete: onDelete,
    onEditSubmit: onEditSubmit,
    summary: summary
  }));
};

exports.DefaultIndex = DefaultIndex;

var Index = function Index(_ref3) {
  var schema = _ref3.schema,
      modelName = _ref3.modelName,
      data = _ref3.data,
      modalData = _ref3.modalData,
      editData = _ref3.editData,
      selectOptions = _ref3.selectOptions,
      path = _ref3.path,
      tooltipData = _ref3.tooltipData,
      tableView = _ref3.tableView,
      customProps = _ref3.customProps,
      summary = _ref3.summary;

  // if singleton, Index redirects to Detail pg
  if (schema.getSingleton(modelName)) {
    var singleton = R.last(data); // singleton may not be null when last deleted; test for 'id'

    var singleId = R.propOr(null, 'id', singleton);

    if (singleId) {
      return _react["default"].createElement(_reactRouterDom.Redirect, {
        to: "/".concat(modelName, "/").concat(singleId)
      });
    } // if no singleId exists, must create


    var actions = schema.getActions(modelName);
    var onCreateClick = R.path(['create', 'onIndexCreate'], actions);
    return _react["default"].createElement("div", {
      className: "container"
    }, _react["default"].createElement("h1", null, "No ".concat(schema.getModelLabel({
      modelName: modelName,
      data: data,
      customProps: customProps
    }), " Exists"), _react["default"].createElement(_CreateButton["default"], {
      onClick: function onClick() {
        return onCreateClick({
          modelName: modelName
        });
      }
    })));
  }

  var IndexOverride = schema.getIndexOverride(modelName);
  var IndexComponent = IndexOverride || DefaultIndex;
  return (0, _Utils.skipOverride)(IndexOverride) ? null : _react["default"].createElement(IndexComponent, {
    schema: schema,
    modelName: modelName,
    data: data,
    modalData: modalData,
    editData: editData,
    selectOptions: selectOptions,
    path: path,
    tooltipData: tooltipData,
    tableView: tableView,
    customProps: customProps,
    summary: summary
  });
};

var _default = Index;
exports["default"] = _default;