"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.DefaultCreate = exports.DefaultCreatePage = exports.DefaultCreateTitle = exports.makeCreateLabel = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactRouterDom = require("react-router-dom");

var R = _interopRequireWildcard(require("ramda"));

var _Input = _interopRequireWildcard(require("./Input"));

var _Breadcrumbs = require("./Breadcrumbs");

var _index = require("../input/index");

var _Utils = require("../Utils");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var getFieldErrorCreate = function getFieldErrorCreate(_ref) {
  var formStack = _ref.formStack,
      stackIndex = _ref.stackIndex,
      fieldName = _ref.fieldName;
  return R.path(['stack', stackIndex, 'errors', fieldName], formStack);
};

var makeCreateLabel = function makeCreateLabel(_ref2) {
  var schema = _ref2.schema,
      modelName = _ref2.modelName,
      fieldName = _ref2.fieldName,
      customProps = _ref2.customProps;
  var type = R.prop('type', schema.getField(modelName, fieldName));

  if (R.type(type) !== 'Object') {
    return null;
  }

  var actions = schema.getActions(modelName);
  var onStackCreate = R.path(['create', 'onStackCreate'], actions);
  var targetModel = R.path(['type', 'target'], schema.getField(modelName, fieldName));

  var onClick = function onClick() {
    return onStackCreate({
      modelName: targetModel
    });
  };

  var CreateLabel = (0, _Input.relationshipLabelFactory)({
    schema: schema,
    modelName: modelName,
    fieldName: fieldName,
    onClick: onClick,
    customProps: customProps
  });
  return CreateLabel;
};

exports.makeCreateLabel = makeCreateLabel;

var getDisabledValue = function getDisabledValue(_ref3) {
  var schema = _ref3.schema,
      modelName = _ref3.modelName,
      fieldName = _ref3.fieldName,
      form = _ref3.form;
  var type = schema.getType(modelName, fieldName);

  if (type.includes('ToMany')) {
    return R.path(['fields', fieldName, 0, 'label'], form);
  } else {
    return R.path(['fields', fieldName, 'label'], form);
  }
};

var DefaultCreateTitle = function DefaultCreateTitle(_ref4) {
  var schema = _ref4.schema,
      modelName = _ref4.modelName,
      customProps = _ref4.customProps;
  return _react["default"].createElement("h1", null, "Create ", schema.getModelLabel({
    modelName: modelName,
    customProps: customProps
  }));
};

exports.DefaultCreateTitle = DefaultCreateTitle;

var DefaultCreatePage = function DefaultCreatePage(_ref5) {
  var schema = _ref5.schema,
      modelName = _ref5.modelName,
      formStack = _ref5.formStack,
      selectOptions = _ref5.selectOptions,
      customProps = _ref5.customProps;
  var stackIndex = R.prop('index', formStack);
  var originFieldName = R.prop('originFieldName', formStack);
  var stack = R.prop('stack', formStack);
  var form = R.prop(stackIndex, stack);
  var origin = R.prop('originModelName', formStack);
  var fieldOrder = schema.getCreateFields({
    modelName: modelName,
    customProps: customProps
  });

  if (origin && stackIndex === 0) {
    var index = fieldOrder.indexOf(originFieldName);

    if (index !== -1) {
      fieldOrder.splice(index, 1);
    }

    fieldOrder.splice(0, 0, originFieldName);
  }

  var actions = schema.getActions(modelName);
  var onChange = R.path(['create', 'onInputChange'], actions);
  var onCancel = R.path(['create', 'onCancel'], actions);
  var onSave = R.path(['create', 'onSave'], actions);
  var disableButtons = stackIndex !== stack.length - 1;
  var autoFocusAdded = false;

  var onKeyDown = function onKeyDown(evt) {
    if (evt.key === 'Enter') {
      return onSave({
        modelName: modelName
      });
    }
  };

  return _react["default"].createElement(_react["default"].Fragment, null, _react["default"].createElement("div", null, "* Indicates a Required Field"), _react["default"].createElement("br", null), _react["default"].createElement("div", null, fieldOrder.map(function (fieldName) {
    if (schema.shouldDisplayCreate({
      modelName: modelName,
      fieldName: fieldName,
      customProps: customProps
    }) === false) {
      return null;
    }

    var disabled = schema.isFieldDisabled({
      modelName: modelName,
      fieldName: fieldName,
      formStack: formStack,
      customProps: customProps
    });
    var value = disabled ? getDisabledValue({
      schema: schema,
      modelName: modelName,
      fieldName: fieldName,
      form: form
    }) : R.path(['fields', fieldName], form);
    var error = getFieldErrorCreate({
      formStack: formStack,
      stackIndex: stackIndex,
      fieldName: fieldName
    });
    var autoFocus = false;

    if (!autoFocusAdded && (0, _index.isAutoFocusInput)(schema.getType(modelName, fieldName))) {
      autoFocus = true;
      autoFocusAdded = true;
    }

    return _react["default"].createElement("div", {
      className: "mb-3"
    }, _react["default"].createElement(_Input["default"], _extends({
      key: fieldName
    }, {
      schema: schema,
      modelName: modelName,
      fieldName: fieldName,
      value: value,
      error: error,
      selectOptions: selectOptions,
      onChange: onChange,
      disabled: disabled,
      formStack: formStack,
      customLabel: makeCreateLabel({
        schema: schema,
        modelName: modelName,
        fieldName: fieldName,
        customProps: customProps
      }),
      autoFocus: autoFocus,
      onKeyDown: onKeyDown,
      customProps: customProps
    })));
  })), disableButtons && _react["default"].createElement("p", {
    className: "text-danger"
  }, "Cannot save or cancel until all subsequent creates are resolved."), _react["default"].createElement("div", {
    className: "btn-group mt-2 mb-3"
  }, _react["default"].createElement("button", {
    className: "btn btn-success",
    role: "button",
    onClick: function onClick() {
      return onSave({
        modelName: modelName
      });
    },
    disabled: disableButtons
  }, "Submit"), _react["default"].createElement("button", {
    className: "btn",
    role: "button",
    onClick: function onClick() {
      return onCancel();
    },
    disabled: disableButtons
  }, "Cancel")));
};

exports.DefaultCreatePage = DefaultCreatePage;

var DefaultCreate = function DefaultCreate(_ref6) {
  var schema = _ref6.schema,
      modelName = _ref6.modelName,
      formStack = _ref6.formStack,
      selectOptions = _ref6.selectOptions,
      customProps = _ref6.customProps;
  var CreateTitleOverride = schema.getCreateTitleOverride(modelName);
  var CreatePageOverride = schema.getCreatePageOverride(modelName);
  var CreateTitle = CreateTitleOverride || DefaultCreateTitle;
  var CreatePage = CreatePageOverride || DefaultCreatePage;

  if ((0, _Utils.skipOverride)(CreateTitleOverride) && (0, _Utils.skipOverride)(CreatePageOverride)) {
    return null;
  }

  return _react["default"].createElement("div", {
    className: "container"
  }, _react["default"].createElement(_Breadcrumbs.Breadcrumbs, {
    schema: schema,
    formStack: formStack,
    customProps: customProps
  }), (0, _Utils.skipOverride)(CreateTitleOverride) ? null : _react["default"].createElement(CreateTitle, {
    schema: schema,
    modelName: modelName,
    customProps: customProps
  }), (0, _Utils.skipOverride)(CreatePageOverride) ? null : _react["default"].createElement(CreatePage, {
    schema: schema,
    modelName: modelName,
    formStack: formStack,
    selectOptions: selectOptions,
    customProps: customProps
  }));
};

exports.DefaultCreate = DefaultCreate;

var Create = function Create(_ref7) {
  var schema = _ref7.schema,
      modelName = _ref7.modelName,
      formStack = _ref7.formStack,
      selectOptions = _ref7.selectOptions,
      customProps = _ref7.customProps;
  var CreateOverride = schema.getCreateOverride(modelName);
  var CreateComponent = CreateOverride || DefaultCreate;

  if (R.prop('index', formStack) === -1) {
    return _react["default"].createElement(_reactRouterDom.Redirect, {
      to: R.propOr('/', 'originPath', formStack)
    });
  }

  return (0, _Utils.skipOverride)(CreateOverride) ? null : _react["default"].createElement(CreateComponent, {
    schema: schema,
    modelName: modelName,
    formStack: formStack,
    selectOptions: selectOptions,
    customProps: customProps
  });
};

var _default = Create;
exports["default"] = _default;