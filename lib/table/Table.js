"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Table = exports.calcDetailField = exports.TableButtonCell = exports.TableRowWithEdit = exports.TableButtonGroup = exports.showButtonColumn = exports.DeleteButton = exports.DetailViewButton = void 0;

var _react = _interopRequireDefault(require("react"));

var _Field = _interopRequireDefault(require("./Field"));

var _Header = require("./Header");

var _Utils = require("../Utils");

var R = _interopRequireWildcard(require("ramda"));

var _DetailLink = _interopRequireDefault(require("../DetailLink"));

var _reactRouterDom = require("react-router-dom");

var _schemaGetters = require("../utils/schemaGetters");

var _DeleteDetail = require("../delete/DeleteDetail");

var _Filter = require("./Filter");

var _Edit = require("../Edit");

var _getDisplayValue = _interopRequireDefault(require("../utils/getDisplayValue"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var DetailViewButton = function DetailViewButton(_ref) {
  var modelName = _ref.modelName,
      id = _ref.id;
  return _react["default"].createElement(_reactRouterDom.Link, {
    to: "/".concat(modelName, "/").concat(id),
    className: "btn btn-sm btn-outline-primary"
  }, "View");
};

exports.DetailViewButton = DetailViewButton;

var DeleteButton = function DeleteButton(_ref2) {
  var schema = _ref2.schema,
      modelName = _ref2.modelName,
      id = _ref2.id,
      onDelete = _ref2.onDelete,
      modalId = _ref2.modalId,
      parentId = _ref2.parentId,
      parentModelName = _ref2.parentModelName,
      modalData = _ref2.modalData;
  var actions = (0, _schemaGetters.getActions)(schema, modelName);
  var onDeleteWarning = R.path(['delete', 'onDeleteWarning'], actions);
  return _react["default"].createElement("div", null, _react["default"].createElement("button", {
    className: "btn btn-sm btn-outline-danger",
    "data-toggle": "modal",
    "data-target": '#' + modalId,
    onClick: function onClick() {
      return onDeleteWarning({
        modelName: modelName,
        id: id
      });
    }
  }, "Delete"), _react["default"].createElement(_DeleteDetail.DeleteDetail, {
    schema: schema,
    id: id,
    modalId: modalId,
    title: 'Confirm Delete',
    modelName: modelName,
    onDelete: onDelete,
    parentId: parentId,
    parentModelName: parentModelName,
    modalStore: R.prop('Delete', modalData)
  }));
};

exports.DeleteButton = DeleteButton;

var showButtonColumn = function showButtonColumn(_ref3) {
  var deletable = _ref3.deletable,
      editable = _ref3.editable,
      detailField = _ref3.detailField;

  /* Check if any of the possible buttons are being displayed */
  return deletable || editable || R.isNil(detailField);
};

exports.showButtonColumn = showButtonColumn;

var TableButtonGroup = function TableButtonGroup(_ref4) {
  var schema = _ref4.schema,
      modelName = _ref4.modelName,
      node = _ref4.node,
      detailField = _ref4.detailField,
      editable = _ref4.editable,
      parentId = _ref4.parentId,
      idx = _ref4.idx,
      modalData = _ref4.modalData,
      parentModelName = _ref4.parentModelName,
      parentFieldName = _ref4.parentFieldName,
      deletable = _ref4.deletable,
      onDelete = _ref4.onDelete;
  return _react["default"].createElement("div", {
    className: "btn-group"
  }, // If detailField is null then use the detailButton
  R.isNil(detailField) && _react["default"].createElement(DetailViewButton, {
    modelName: modelName,
    id: node.id
  }), editable && _react["default"].createElement(_Edit.RowEditButton, {
    schema: schema,
    modelName: modelName,
    id: node.id,
    node: node
  }), deletable && _react["default"].createElement(DeleteButton, {
    schema: schema,
    modelName: modelName,
    onDelete: onDelete,
    parentId: parentId,
    parentModelName: parentModelName,
    id: node.id,
    modalId: 'confirm-delete-' + modelName + parentFieldName + idx,
    modalData: modalData
  }));
};

exports.TableButtonGroup = TableButtonGroup;

var TableRowWithEdit = function TableRowWithEdit(_ref5) {
  var modelName = _ref5.modelName,
      fieldName = _ref5.fieldName,
      parentModelName = _ref5.parentModelName,
      node = _ref5.node,
      schema = _ref5.schema,
      detailField = _ref5.detailField,
      editData = _ref5.editData,
      tooltipData = _ref5.tooltipData,
      selectOptions = _ref5.selectOptions,
      user = _ref5.user,
      parentNode = _ref5.parentNode,
      customProps = _ref5.customProps;

  if ((0, _Edit.isEditing)(editData, modelName, node.id) && (0, _Utils.isFieldEditable)({
    schema: schema,
    modelName: modelName,
    fieldName: fieldName,
    node: node,
    user: user,
    parentNode: parentNode,
    customProps: customProps
  })) {
    var fieldEditData = (0, _Edit.getFieldEditData)(editData, modelName, fieldName, node.id);
    var error = (0, _Edit.getFieldErrorEdit)(editData, modelName, fieldName, node.id);
    return _react["default"].createElement(_Edit.EditInput, {
      schema: schema,
      modelName: modelName,
      fieldName: fieldName,
      node: node,
      editData: fieldEditData,
      error: error,
      selectOptions: selectOptions
    });
  }

  var Override = (0, _Utils.getCellOverride)(schema, modelName, fieldName);

  if ((0, _Utils.skipOverride)(Override)) {
    return null;
  }

  if (Override) {
    return _react["default"].createElement(Override, {
      schema: schema,
      modelName: modelName,
      fieldName: fieldName,
      parentModelName: parentModelName,
      node: node,
      tooltipData: tooltipData,
      id: node.id,
      customProps: customProps
    });
  } // Add DetailLink to the field that is marked as the displayField


  if (detailField === fieldName) {
    var displayString = (0, _getDisplayValue["default"])({
      schema: schema,
      modelName: modelName,
      parentModelName: parentModelName,
      node: node
    });
    return _react["default"].createElement(_DetailLink["default"], {
      modelName: modelName,
      id: node.id
    }, displayString);
  }

  return _react["default"].createElement(_Field["default"], {
    schema: schema,
    modelName: modelName,
    fieldName: fieldName,
    parentModelName: parentModelName,
    node: node,
    tooltipData: tooltipData,
    id: node.id
  });
};

exports.TableRowWithEdit = TableRowWithEdit;

var TableButtonCell = function TableButtonCell(_ref6) {
  var modelName = _ref6.modelName,
      parentModelName = _ref6.parentModelName,
      node = _ref6.node,
      schema = _ref6.schema,
      detailField = _ref6.detailField,
      editData = _ref6.editData,
      onEditSubmit = _ref6.onEditSubmit,
      onEditCancel = _ref6.onEditCancel,
      deletable = _ref6.deletable,
      editable = _ref6.editable,
      parentId = _ref6.parentId,
      modalData = _ref6.modalData,
      parentFieldName = _ref6.parentFieldName,
      onDelete = _ref6.onDelete,
      idx = _ref6.idx;
  return (0, _Edit.isEditing)(editData, modelName, node.id) ? _react["default"].createElement("div", {
    className: "table-btn-group"
  }, _react["default"].createElement("div", {
    className: "btn-group"
  }, _react["default"].createElement(_Edit.EditSaveButton, {
    onClick: function onClick(evt) {
      return onEditSubmit({
        modelName: modelName,
        id: node.id
      });
    }
  }), _react["default"].createElement(_Edit.EditCancelButton, {
    onClick: function onClick(evt) {
      return onEditCancel({
        modelName: modelName,
        id: node.id
      });
    }
  }))) : _react["default"].createElement(TableButtonGroup, {
    schema: schema,
    modelName: modelName,
    node: node,
    detailField: detailField,
    deletable: deletable,
    editable: editable,
    parentId: parentId,
    idx: idx,
    modalData: modalData,
    parentModelName: parentModelName,
    parentFieldName: parentFieldName,
    onDelete: onDelete
  });
};

exports.TableButtonCell = TableButtonCell;

var TBody = function TBody(_ref7) {
  var schema = _ref7.schema,
      modelName = _ref7.modelName,
      data = _ref7.data,
      fieldOrder = _ref7.fieldOrder,
      onDelete = _ref7.onDelete,
      onEditSubmit = _ref7.onEditSubmit,
      parentId = _ref7.parentId,
      parentModelName = _ref7.parentModelName,
      parentFieldName = _ref7.parentFieldName,
      detailField = _ref7.detailField,
      tooltipData = _ref7.tooltipData,
      modalData = _ref7.modalData,
      editData = _ref7.editData,
      tableEditable = _ref7.tableEditable,
      deletable = _ref7.deletable,
      selectOptions = _ref7.selectOptions,
      user = _ref7.user,
      parentNode = _ref7.parentNode,
      customProps = _ref7.customProps;
  var actions = (0, _schemaGetters.getActions)(schema, modelName);
  var onEditCancel = R.path(['edit', 'onTableEditCancel'], actions);
  return _react["default"].createElement("tbody", null, data.map(function (node, idx) {
    var editable = (0, _Utils.isRowEditable)({
      schema: schema,
      modelName: modelName,
      node: node,
      user: user,
      customProps: customProps
    });
    return _react["default"].createElement("tr", {
      key: "table-tr-".concat(node.id)
    }, fieldOrder.map(function (fieldName, headerIdx) {
      return _react["default"].createElement("td", {
        key: "".concat(node.id, "-").concat(headerIdx)
      }, _react["default"].createElement(TableRowWithEdit, _extends({
        key: "table-td-".concat(node.id, "-").concat(headerIdx)
      }, {
        modelName: modelName,
        fieldName: fieldName,
        parentModelName: parentModelName,
        node: node,
        schema: schema,
        detailField: detailField,
        editData: editData,
        tooltipData: tooltipData,
        selectOptions: selectOptions,
        user: user,
        parentNode: parentNode,
        customProps: customProps
      })));
    }), showButtonColumn({
      deletable: deletable,
      editable: tableEditable,
      detailField: detailField
    }) && _react["default"].createElement("td", {
      key: "".concat(node.id, "-edit-delete")
    }, _react["default"].createElement(TableButtonCell, {
      modelName: modelName,
      parentModelName: parentModelName,
      node: node,
      schema: schema,
      detailField: detailField,
      editData: editData,
      onEditSubmit: onEditSubmit,
      onEditCancel: onEditCancel,
      deletable: deletable,
      editable: editable,
      parentId: parentId,
      modalData: modalData,
      parentFieldName: parentFieldName,
      onDelete: onDelete,
      idx: idx
    })));
  }));
};

var calcDetailField = function calcDetailField(_ref8) {
  var schema = _ref8.schema,
      modelName = _ref8.modelName,
      fieldOrder = _ref8.fieldOrder;
  var model = (0, _schemaGetters.getModel)(schema, modelName);
  var schemaDefinedLinkField = R.prop('tableLinkField', model); // If the schema explicitly defines a field that is not found, raise an error

  if (schemaDefinedLinkField && !fieldOrder.includes(schemaDefinedLinkField)) {
    throw new Error('Schema attribute for displayField does not exist in fieldOrder.');
  } // If the schema does not define a displayField then check if there is a name field


  return schemaDefinedLinkField || (fieldOrder.includes('name') ? 'name' : null);
};
/* Generic Overidable Table. To Override th/td pass in Table with <thead>/<tbody> component overriden. */


exports.calcDetailField = calcDetailField;

var Table = function Table(_ref9) {
  var schema = _ref9.schema,
      modelName = _ref9.modelName,
      node = _ref9.node,
      data = _ref9.data,
      fieldOrder = _ref9.fieldOrder,
      onDelete = _ref9.onDelete,
      onEditSubmit = _ref9.onEditSubmit,
      modalData = _ref9.modalData,
      editData = _ref9.editData,
      selectOptions = _ref9.selectOptions,
      parentId = _ref9.parentId,
      parentModelName = _ref9.parentModelName,
      parentFieldName = _ref9.parentFieldName,
      tooltipData = _ref9.tooltipData,
      tableOptions = _ref9.tableOptions,
      _ref9$Head = _ref9.Head,
      Head = _ref9$Head === void 0 ? _Header.THead : _ref9$Head,
      _ref9$Body = _ref9.Body,
      Body = _ref9$Body === void 0 ? TBody : _ref9$Body,
      user = _ref9.user,
      customProps = _ref9.customProps;
  // parent node passed down as 'parentNode'
  var parentNode = node;
  var filterable = R.path([modelName, 'filterable'], schema);
  var allColFilterable = (0, _Filter.isTableFilterable)({
    schema: schema,
    modelName: modelName,
    fieldOrder: fieldOrder,
    tableOptions: tableOptions,
    filterable: filterable
  });

  if (!allColFilterable && !data) {
    return _react["default"].createElement("div", null, "...Loading");
  }

  if (!allColFilterable && data.length === 0) {
    return _react["default"].createElement("div", {
      style: {
        paddingBottom: '10px'
      }
    }, "N/A");
  }

  var deletable = (0, _Utils.isTableDeletable)({
    schema: schema,
    modelName: modelName,
    data: data,
    parentNode: parentNode,
    user: user,
    customProps: customProps
  });
  var detailField = calcDetailField({
    schema: schema,
    modelName: modelName,
    fieldOrder: fieldOrder
  });
  var editable = (0, _Utils.isTableEditable)({
    schema: schema,
    modelName: modelName,
    data: data,
    parentNode: parentNode,
    user: user,
    customProps: customProps
  });
  var sortable = R.path([modelName, 'sortable'], schema);
  return _react["default"].createElement("table", {
    className: "table table-striped table-bordered table-hover"
  }, _react["default"].createElement(Head, {
    schema: schema,
    modelName: modelName,
    fieldOrder: fieldOrder,
    data: data,
    deletable: deletable,
    editable: editable,
    detailField: detailField,
    selectOptions: selectOptions,
    sortable: sortable,
    filterable: filterable,
    tableOptions: tableOptions
  }), _react["default"].createElement(Body, {
    schema: schema,
    modelName: modelName,
    data: data,
    onDelete: onDelete,
    onEditSubmit: onEditSubmit,
    fieldOrder: fieldOrder,
    detailField: detailField,
    tooltipData: tooltipData,
    parentId: parentId,
    parentModelName: parentModelName,
    parentFieldName: parentFieldName,
    modalData: modalData,
    selectOptions: selectOptions,
    editData: editData,
    deletable: deletable,
    tableEditable: editable,
    user: user,
    parentNode: parentNode,
    customProps: customProps
  }));
};

exports.Table = Table;