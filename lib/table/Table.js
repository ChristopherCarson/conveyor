"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Table = exports.TableButtonCell = exports.TableRowWithEdit = exports.TableButtonGroup = exports.showButtonColumn = exports.RemoveButton = exports.DeleteButton = exports.DetailViewButton = void 0;

var _react = _interopRequireDefault(require("react"));

var _Field = _interopRequireDefault(require("./Field"));

var _Header = require("./Header");

var _Footer = require("./Footer");

var _Utils = require("../Utils");

var R = _interopRequireWildcard(require("ramda"));

var _DetailLink = _interopRequireDefault(require("../DetailLink"));

var _reactRouterDom = require("react-router-dom");

var _DeleteDetail = require("../delete/DeleteDetail");

var _Edit = require("../Edit");

var _Pagination = require("../Pagination");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

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
  var modalId = _ref2.modalId,
      onDeleteWarning = _ref2.onDeleteWarning,
      modelName = _ref2.modelName,
      id = _ref2.id;
  return _react["default"].createElement("button", {
    className: "btn btn-sm btn-outline-danger",
    "data-toggle": "modal",
    "data-target": '#' + modalId,
    onClick: function onClick() {
      return onDeleteWarning({
        modelName: modelName,
        id: id
      });
    }
  }, "Delete");
};

exports.DeleteButton = DeleteButton;

var RemoveButton = function RemoveButton(_ref3) {
  var modalId = _ref3.modalId;
  return _react["default"].createElement("button", {
    className: "btn btn-sm btn-outline-warning",
    "data-toggle": "modal",
    "data-target": '#' + modalId
  }, "Remove");
};

exports.RemoveButton = RemoveButton;

var showButtonColumn = function showButtonColumn(_ref4) {
  var deletable = _ref4.deletable,
      editable = _ref4.editable,
      detailField = _ref4.detailField;

  /* Check if any of the possible buttons are being displayed */
  return deletable || editable || R.isNil(detailField);
};

exports.showButtonColumn = showButtonColumn;

var TableButtonGroup = function TableButtonGroup(_ref5) {
  var schema = _ref5.schema,
      modelName = _ref5.modelName,
      node = _ref5.node,
      detailField = _ref5.detailField,
      editable = _ref5.editable,
      parentId = _ref5.parentId,
      idx = _ref5.idx,
      modalData = _ref5.modalData,
      parentModelName = _ref5.parentModelName,
      parentFieldName = _ref5.parentFieldName,
      deletable = _ref5.deletable,
      onDelete = _ref5.onDelete,
      fromIndex = _ref5.fromIndex,
      customProps = _ref5.customProps;
  var parentFieldType = schema.getType(parentModelName, parentFieldName);
  var m2m = parentFieldType === 'ManyToMany';
  var actions = schema.getActions(modelName);
  var onRemove = R.path(['edit', 'onDetailTableRemoveSubmit'], actions);
  var modalId = "confirm-".concat(m2m ? 'remove' : 'delete', "-").concat(modelName, "-").concat(parentFieldName, "-").concat(idx);
  var id = node.id;
  var canRemove = !fromIndex && m2m && editable;
  return _react["default"].createElement(_react["default"].Fragment, null, _react["default"].createElement("div", {
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
  }), canRemove && _react["default"].createElement(RemoveButton, {
    modalId: modalId,
    modelName: modelName,
    id: id
  }), deletable && !canRemove && _react["default"].createElement(DeleteButton, {
    modalId: modalId,
    onDeleteWarning: R.path(['delete', 'onDeleteWarning'], actions),
    modelName: modelName,
    id: id
  })), canRemove && _react["default"].createElement(_DeleteDetail.RemoveDetail, {
    schema: schema,
    id: id,
    modalId: modalId,
    modelName: modelName,
    onRemove: onRemove,
    parentId: parentId,
    parentModelName: parentModelName,
    parentFieldName: parentFieldName,
    node: node,
    customProps: customProps
  }), deletable && !canRemove && _react["default"].createElement(_DeleteDetail.DeleteDetail, {
    schema: schema,
    id: id,
    modalId: modalId,
    modelName: modelName,
    onDelete: onDelete,
    parentId: parentId,
    parentModelName: parentModelName,
    modalData: modalData,
    customProps: customProps
  }));
};

exports.TableButtonGroup = TableButtonGroup;

var TableRowWithEdit = function TableRowWithEdit(_ref6) {
  var modelName = _ref6.modelName,
      fieldName = _ref6.fieldName,
      node = _ref6.node,
      schema = _ref6.schema,
      detailField = _ref6.detailField,
      editData = _ref6.editData,
      tooltipData = _ref6.tooltipData,
      selectOptions = _ref6.selectOptions,
      parentNode = _ref6.parentNode,
      customProps = _ref6.customProps;

  if ((0, _Edit.isEditing)(editData, modelName, node.id) && schema.isFieldEditable({
    modelName: modelName,
    fieldName: fieldName,
    node: node,
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
      selectOptions: selectOptions,
      customProps: customProps
    });
  }

  var Override = schema.getCellOverride(modelName, fieldName);

  if ((0, _Utils.skipOverride)(Override)) {
    return null;
  }

  if (Override) {
    return _react["default"].createElement(Override, {
      schema: schema,
      modelName: modelName,
      fieldName: fieldName,
      node: node,
      tooltipData: tooltipData,
      id: node.id,
      customProps: customProps
    });
  } // Add DetailLink to the field that is marked as the displayField


  if (detailField === fieldName) {
    var displayString = schema.getDisplayValue({
      modelName: modelName,
      node: node,
      customProps: customProps
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
    node: node,
    tooltipData: tooltipData,
    id: node.id,
    customProps: customProps
  });
};

exports.TableRowWithEdit = TableRowWithEdit;

var TableButtonCell = function TableButtonCell(_ref7) {
  var modelName = _ref7.modelName,
      parentModelName = _ref7.parentModelName,
      node = _ref7.node,
      schema = _ref7.schema,
      detailField = _ref7.detailField,
      editData = _ref7.editData,
      onEditSubmit = _ref7.onEditSubmit,
      onEditCancel = _ref7.onEditCancel,
      deletable = _ref7.deletable,
      editable = _ref7.editable,
      parentId = _ref7.parentId,
      modalData = _ref7.modalData,
      parentFieldName = _ref7.parentFieldName,
      onDelete = _ref7.onDelete,
      idx = _ref7.idx,
      fromIndex = _ref7.fromIndex,
      customProps = _ref7.customProps;
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
    onDelete: onDelete,
    fromIndex: fromIndex,
    customProps: customProps
  });
};

exports.TableButtonCell = TableButtonCell;

var TBody = function TBody(_ref8) {
  var schema = _ref8.schema,
      modelName = _ref8.modelName,
      data = _ref8.data,
      fieldOrder = _ref8.fieldOrder,
      onDelete = _ref8.onDelete,
      onEditSubmit = _ref8.onEditSubmit,
      parentId = _ref8.parentId,
      parentModelName = _ref8.parentModelName,
      parentFieldName = _ref8.parentFieldName,
      detailField = _ref8.detailField,
      tooltipData = _ref8.tooltipData,
      modalData = _ref8.modalData,
      editData = _ref8.editData,
      tableEditable = _ref8.tableEditable,
      deletable = _ref8.deletable,
      selectOptions = _ref8.selectOptions,
      parentNode = _ref8.parentNode,
      fromIndex = _ref8.fromIndex,
      customProps = _ref8.customProps;
  var actions = schema.getActions(modelName);
  var onEditCancel = R.path(['edit', 'onTableEditCancel'], actions);
  return _react["default"].createElement("tbody", null, data.map(function (node, idx) {
    var editable = schema.isRowEditable({
      modelName: modelName,
      node: node,
      parentNode: parentNode,
      fieldOrder: fieldOrder,
      customProps: customProps
    });
    return _react["default"].createElement("tr", {
      key: "table-tr-".concat(node.id)
    }, fieldOrder.map(function (fieldName, headerIdx) {
      if (fromIndex === true) {
        if (schema.shouldDisplayIndex({
          modelName: modelName,
          fieldName: fieldName,
          customProps: customProps
        }) === false) {
          return null;
        }
      }

      return _react["default"].createElement("td", {
        key: "".concat(node.id, "-").concat(headerIdx)
      }, _react["default"].createElement(TableRowWithEdit, _extends({
        key: "table-td-".concat(node.id, "-").concat(headerIdx)
      }, {
        modelName: modelName,
        fieldName: fieldName,
        node: node,
        schema: schema,
        detailField: detailField,
        editData: editData,
        tooltipData: tooltipData,
        selectOptions: selectOptions,
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
      idx: idx,
      fromIndex: fromIndex,
      customProps: customProps
    })));
  }));
};
/* Generic Overidable Table. To Override th/td pass in Table with <thead>/<tbody> component overriden. */


var Table = function Table(_ref9) {
  var schema = _ref9.schema,
      modelName = _ref9.modelName,
      parentNode = _ref9.node,
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
      tableView = _ref9.tableView,
      _ref9$Head = _ref9.Head,
      Head = _ref9$Head === void 0 ? _Header.THead : _ref9$Head,
      _ref9$Body = _ref9.Body,
      Body = _ref9$Body === void 0 ? TBody : _ref9$Body,
      _ref9$Foot = _ref9.Foot,
      Foot = _ref9$Foot === void 0 ? _Footer.TFoot : _ref9$Foot,
      collapse = _ref9.collapse,
      fromIndex = _ref9.fromIndex,
      customProps = _ref9.customProps,
      summary = _ref9.summary;

  if (!fromIndex && collapse) {
    return null;
  }

  if (!data) {
    return _react["default"].createElement("div", null, "...Loading");
  }

  if (!fromIndex && data.length === 0) {
    return _react["default"].createElement("div", {
      style: {
        paddingBottom: '10px'
      }
    }, "N/A");
  }

  var deletable = schema.isTableDeletable({
    modelName: modelName,
    data: data,
    parentNode: parentNode,
    customProps: customProps
  });
  var detailField = schema.getTableLinkField(modelName, fieldOrder);
  var editable = schema.isTableEditable({
    modelName: modelName,
    data: data,
    parentNode: parentNode,
    fieldOrder: fieldOrder,
    customProps: customProps
  });
  return _react["default"].createElement(_react["default"].Fragment, null, _react["default"].createElement("table", {
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
    tableView: tableView,
    fromIndex: fromIndex,
    customProps: customProps
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
    parentNode: parentNode,
    fromIndex: fromIndex,
    customProps: customProps
  }), _react["default"].createElement(Foot, {
    schema: schema,
    modelName: modelName,
    parentModelName: parentModelName,
    parentFieldName: parentFieldName,
    fieldOrder: fieldOrder,
    summary: summary,
    fromIndex: fromIndex,
    customProps: customProps
  })), fromIndex ? _react["default"].createElement(_Pagination.IndexPagination, {
    schema: schema,
    modelName: modelName,
    tableView: tableView
  }) : _react["default"].createElement(_Pagination.DetailPagination, {
    schema: schema,
    modelName: parentModelName,
    fieldName: parentFieldName,
    tableView: tableView
  }));
};

exports.Table = Table;