"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FilterComp = exports.FilterModalButton = exports.FilterModal = exports.isModelFilterable = exports.isTableFilterable = exports.isColFilterable = exports.isFilterable = void 0;

var _react = _interopRequireDefault(require("react"));

var _Input = require("../form/Input");

var _InputType = require("../form/InputType");

var _reactSvg = _interopRequireDefault(require("react-svg"));

var R = _interopRequireWildcard(require("ramda"));

var _consts = require("../consts");

var _input = _interopRequireDefault(require("../input"));

var _Modal = require("../Modal");

var _schemaGetters = require("../utils/schemaGetters.js");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var isFilterable = function isFilterable(_ref) {
  var schema = _ref.schema,
      modelName = _ref.modelName,
      fieldName = _ref.fieldName;
  var inputType = (0, _InputType.getInputType)({
    schema: schema,
    modelName: modelName,
    fieldName: fieldName
  });
  return !(R.isNil(inputType) || inputType === _consts.inputTypes.CREATABLE_STRING_SELECT_TYPE || // disabled for now
  inputType === _consts.inputTypes.ENUM_TYPE || inputType === _consts.inputTypes.RELATIONSHIP_SINGLE || inputType === _consts.inputTypes.RELATIONSHIP_MULTIPLE || inputType === _consts.inputTypes.DATE_TYPE || inputType === _consts.inputTypes.PHONE_TYPE || inputType === _consts.inputTypes.BOOLEAN_TYPE || inputType === _consts.inputTypes.ID_TYPE || // todo: add back currency once filter permissions added
  inputType === _consts.inputTypes.CURRENCY_TYPE);
};

exports.isFilterable = isFilterable;

var isColFilterable = function isColFilterable(_ref2) {
  var schema = _ref2.schema,
      modelName = _ref2.modelName,
      fieldName = _ref2.fieldName,
      tableOptions = _ref2.tableOptions,
      filterable = _ref2.filterable;
  return !!tableOptions && filterable && isFilterable({
    schema: schema,
    modelName: modelName,
    fieldName: fieldName
  });
};

exports.isColFilterable = isColFilterable;

var isTableFilterable = function isTableFilterable(_ref3) {
  var schema = _ref3.schema,
      modelName = _ref3.modelName,
      fieldOrder = _ref3.fieldOrder,
      tableOptions = _ref3.tableOptions,
      filterable = _ref3.filterable;
  var boolList = R.map(function (fieldName) {
    return isColFilterable({
      schema: schema,
      modelName: modelName,
      fieldName: fieldName,
      tableOptions: tableOptions,
      filterable: filterable
    });
  }, fieldOrder);
  return !R.isEmpty(R.filter(R.identity, boolList));
};

exports.isTableFilterable = isTableFilterable;

var isModelFilterable = function isModelFilterable(_ref4) {
  var schema = _ref4.schema,
      modelName = _ref4.modelName,
      tableOptions = _ref4.tableOptions;
  var model = R.prop(modelName, schema);
  var fieldOrder = R.prop('fieldOrder', model);
  var filterable = R.propOr(true, 'filterable', model);
  return isTableFilterable({
    schema: schema,
    modelName: modelName,
    fieldOrder: fieldOrder,
    tableOptions: tableOptions,
    filterable: filterable
  });
};

exports.isModelFilterable = isModelFilterable;

var getFilterableFields = function getFilterableFields(_ref5) {
  var modelName = _ref5.modelName,
      schema = _ref5.schema;
  var fields = R.pathOr([], [modelName, 'fieldOrder'], schema);
  var filterables = fields.filter(function (fieldName) {
    return isFilterable({
      schema: schema,
      modelName: modelName,
      fieldName: fieldName
    });
  });
  return filterables;
};

var FilterButtons = function FilterButtons(_ref6) {
  var modelName = _ref6.modelName,
      onFilterSubmit = _ref6.onFilterSubmit,
      clearFilters = _ref6.clearFilters,
      onAdd = _ref6.onAdd;
  return _react["default"].createElement("div", {
    className: "mt-3"
  }, _react["default"].createElement("button", {
    className: "btn btn-primary btn-sm",
    onClick: function onClick() {
      return onAdd({
        modelName: modelName
      });
    }
  }, "+ Add Rule"), _react["default"].createElement("div", {
    className: "d-inline float-right"
  }, _react["default"].createElement("div", {
    className: "btn-group"
  }, _react["default"].createElement("button", {
    className: "btn btn-success btn-sm",
    onClick: function onClick() {
      return onFilterSubmit({
        modelName: modelName
      });
    }
  }, "Apply"), _react["default"].createElement("button", {
    className: "btn btn-outline-danger btn-sm",
    onClick: function onClick() {
      clearFilters({
        modelName: modelName
      });
      onFilterSubmit({
        modelName: modelName
      });
    }
  }, "Reset"))));
};

var formatFilter = function formatFilter(_ref7) {
  var fieldName = _ref7.fieldName,
      index = _ref7.index,
      modelName = _ref7.modelName,
      schema = _ref7.schema,
      data = _ref7.data,
      _onChange = _ref7.onChange,
      selectOptions = _ref7.selectOptions,
      filterOrder = _ref7.filterOrder,
      _onFilterChange = _ref7.onFilterChange,
      onFilterSubmit = _ref7.onFilterSubmit,
      onFilterDropdown = _ref7.onFilterDropdown,
      filterInputs = _ref7.filterInputs,
      deleteFilter = _ref7.deleteFilter;
  var filterInput = R.prop(fieldName, filterInputs);
  var filterables = getFilterableFields({
    modelName: modelName,
    schema: schema
  });

  var toOptions = function toOptions(fieldName) {
    return {
      label: (0, _schemaGetters.getFieldLabel)({
        schema: schema,
        modelName: modelName,
        fieldName: fieldName,
        data: data
      }),
      value: fieldName
    };
  };

  var unfiltered = filterables.filter(function (fieldName) {
    return !filterOrder.includes(fieldName);
  });
  var options = unfiltered.map(function (fieldName) {
    return toOptions(fieldName);
  });
  var value = R.isNil(fieldName) || R.isEmpty(fieldName) ? {
    label: null,
    value: null
  } : toOptions(filterOrder[index]);
  return _react["default"].createElement("li", {
    key: "".concat(index, "-").concat(modelName, "-").concat(fieldName, "-format-filter"),
    className: "list-group-item filter"
  }, _react["default"].createElement("div", {
    className: "filter-fieldname-dropdown"
  }, _react["default"].createElement("div", {
    className: "w-100"
  }, _react["default"].createElement(_input["default"], {
    type: _consts.inputTypes.SELECT_TYPE,
    onChange: function onChange(evt) {
      return _onChange({
        modelName: modelName,
        fieldName: R.prop('value', evt),
        index: index
      });
    },
    value: value,
    options: options,
    id: "".concat(index, "-").concat(modelName, "-filter-dropdown"),
    customInput: {
      noOptionsMessage: function noOptionsMessage() {
        return '(no filterable fields)';
      },
      placeholder: 'Select field...',
      isClearable: false
    }
  }))), _react["default"].createElement("div", {
    className: "filter-rest align-middle"
  }, _react["default"].createElement("div", {
    className: "w-100"
  }, _react["default"].createElement(FilterComp, {
    fieldName: fieldName,
    modelName: modelName,
    schema: schema,
    onFilterChange: function onFilterChange(evt) {
      return _onFilterChange(_objectSpread({
        modelName: modelName
      }, evt));
    },
    onFilterSubmit: onFilterSubmit,
    onFilterDropdown: onFilterDropdown,
    filterInput: filterInput,
    selectOptions: selectOptions
  }))), _react["default"].createElement("div", {
    className: "filter-close filter-padded align-middle"
  }, _react["default"].createElement("button", {
    className: "btn btn-sm btn-danger btn-block",
    onClick: function onClick() {
      return deleteFilter({
        modelName: modelName,
        index: index
      });
    }
  }, "X")));
};

var ActiveFilters = function ActiveFilters(_ref8) {
  var modelName = _ref8.modelName,
      schema = _ref8.schema,
      data = _ref8.data,
      addFilter = _ref8.addFilter,
      deleteFilter = _ref8.deleteFilter,
      onChange = _ref8.onChange,
      selectOptions = _ref8.selectOptions,
      filterOrder = _ref8.filterOrder,
      clearFilters = _ref8.clearFilters,
      onFilterChange = _ref8.onFilterChange,
      onFilterSubmit = _ref8.onFilterSubmit,
      onFilterDropdown = _ref8.onFilterDropdown,
      filterInputs = _ref8.filterInputs;
  return _react["default"].createElement("div", {
    id: 'active-filters-' + modelName,
    className: "mb-2"
  }, _react["default"].createElement("ul", {
    className: "list-group"
  }, R.isEmpty(filterOrder) || R.isNil(filterOrder) ? _react["default"].createElement("li", {
    key: -1,
    className: "list-group-item text-muted"
  }, "Add a rule to get started...") : filterOrder.map(function (fieldName, index) {
    return formatFilter({
      fieldName: fieldName,
      index: index,
      modelName: modelName,
      schema: schema,
      data: data,
      onChange: onChange,
      selectOptions: selectOptions,
      filterOrder: filterOrder,
      onFilterChange: onFilterChange,
      onFilterSubmit: onFilterSubmit,
      onFilterDropdown: onFilterDropdown,
      filterInputs: filterInputs,
      deleteFilter: deleteFilter
    });
  })), _react["default"].createElement(FilterButtons, {
    modelName: modelName,
    onFilterSubmit: onFilterSubmit,
    clearFilters: clearFilters,
    onAdd: addFilter
  }));
};

var FilterModal = function FilterModal(_ref9) {
  var modelName = _ref9.modelName,
      schema = _ref9.schema,
      selectOptions = _ref9.selectOptions,
      data = _ref9.data,
      addFilter = _ref9.addFilter,
      deleteFilter = _ref9.deleteFilter,
      clearFilters = _ref9.clearFilters,
      changeField = _ref9.changeField,
      onFilterChange = _ref9.onFilterChange,
      onFilterSubmit = _ref9.onFilterSubmit,
      onFilterDropdown = _ref9.onFilterDropdown,
      currentFilters = _ref9.currentFilters,
      filterOrder = _ref9.filterOrder,
      filterInputs = _ref9.filterInputs;
  return _react["default"].createElement(_Modal.Modal, {
    id: 'filter-' + modelName,
    title: 'Filters - ' + modelName,
    children: _react["default"].createElement(ActiveFilters, {
      modelName: modelName,
      schema: schema,
      data: data,
      addFilter: addFilter,
      deleteFilter: deleteFilter,
      onChange: changeField,
      selectOptions: selectOptions,
      currentFilters: currentFilters,
      filterOrder: filterOrder,
      clearFilters: clearFilters,
      onFilterChange: onFilterChange,
      onFilterSubmit: onFilterSubmit,
      onFilterDropdown: onFilterDropdown,
      filterInputs: filterInputs
    })
  });
};

exports.FilterModal = FilterModal;

var FilterModalButton = function FilterModalButton(_ref10) {
  var modelName = _ref10.modelName,
      filtersAreActive = _ref10.filtersAreActive;
  return _react["default"].createElement("button", {
    className: 'btn btn-sm btn-outline-primary',
    "data-toggle": "modal",
    "data-target": '#filter-' + modelName
  }, "Filter", _react["default"].createElement(_reactSvg["default"], {
    src: "/static/img/filter.svg",
    className: "header-icon ml-2",
    svgStyle: {
      width: '12px',
      height: '12px',
      fill: filtersAreActive ? 'lightgreen' : 'black'
    }
  }));
};

exports.FilterModalButton = FilterModalButton;

var FilterDropdown = function FilterDropdown(_ref11) {
  var modelName = _ref11.modelName,
      fieldName = _ref11.fieldName,
      operator = _ref11.operator,
      onFilterDropdown = _ref11.onFilterDropdown,
      options = _ref11.options;
  return _react["default"].createElement(_react["default"].Fragment, null, _react["default"].createElement(_input["default"], {
    type: _consts.inputTypes.SELECT_TYPE,
    onChange: function onChange(val) {
      return onFilterDropdown({
        modelName: modelName,
        fieldName: fieldName,
        operator: val
      });
    },
    value: operator,
    options: options,
    id: "".concat(modelName, "-").concat(fieldName, "-filter-radio"),
    customInput: {
      isClearable: false
    }
  }));
};

var stringOptions = [{
  label: 'Includes',
  value: 'INCLUDES'
}, {
  label: 'Equals',
  value: 'EQUALS'
}];
var numberOptions = [{
  label: '<',
  value: 'lt'
}, {
  label: '<=',
  value: 'lte'
}, {
  label: '=',
  value: 'eq'
}, {
  label: '!=',
  value: 'neq'
}, {
  label: '>',
  value: 'gt'
}, {
  label: '>=',
  value: 'gte'
}];
var relOptions = [{
  label: 'Includes',
  value: 'INCLUDES'
}];
var enumOptions = [{
  label: 'Includes',
  value: 'INCLUDES'
}, {
  label: 'Excludes',
  value: 'EXCLUDES'
}];

var FilterOptions = function FilterOptions(_ref12) {
  var schema = _ref12.schema,
      modelName = _ref12.modelName,
      fieldName = _ref12.fieldName,
      operator = _ref12.operator,
      onFilterSubmit = _ref12.onFilterSubmit,
      onFilterDropdown = _ref12.onFilterDropdown;
  var inputType = (0, _InputType.getInputType)({
    schema: schema,
    modelName: modelName,
    fieldName: fieldName
  });
  var options;

  switch (inputType) {
    case _consts.inputTypes.INT_TYPE:
    case _consts.inputTypes.FLOAT_TYPE:
    case _consts.inputTypes.CURRENCY_TYPE:
      options = numberOptions;
      break;

    case _consts.inputTypes.ENUM_TYPE:
      options = enumOptions;
      break;

    case _consts.inputTypes.RELATIONSHIP_SINGLE:
    case _consts.inputTypes.RELATIONSHIP_MULTIPLE:
      options = relOptions;
      break;

    default:
      options = stringOptions;
  }

  return _react["default"].createElement(FilterDropdown, {
    modelName: modelName,
    fieldName: fieldName,
    operator: operator,
    onFilterSubmit: onFilterSubmit,
    onFilterDropdown: onFilterDropdown,
    options: options
  });
}; // todo: finish
// case inputTypes.DATE_TYPE:
// case inputTypes.PHONE_TYPE:
// case inputTypes.BOOLEAN_TYPE:


var FilterPopover = function FilterPopover(_ref13) {
  var schema = _ref13.schema,
      modelName = _ref13.modelName,
      fieldName = _ref13.fieldName,
      value = _ref13.value,
      operator = _ref13.operator,
      onFilterChange = _ref13.onFilterChange,
      onFilterSubmit = _ref13.onFilterSubmit,
      onFilterDropdown = _ref13.onFilterDropdown,
      selectOptions = _ref13.selectOptions;

  if (R.isNil(fieldName) || R.isEmpty(fieldName)) {
    return _react["default"].createElement("div", {
      className: "ml-1 mt-1 filter-padded"
    }, "Select a field");
  }

  return _react["default"].createElement("div", null, _react["default"].createElement("div", {
    className: "filter-operator-dropdown"
  }, _react["default"].createElement(FilterOptions, {
    schema: schema,
    modelName: modelName,
    fieldName: fieldName,
    operator: operator,
    onFilterSubmit: onFilterSubmit,
    onFilterDropdown: onFilterDropdown
  })), _react["default"].createElement("div", {
    className: "filter-input"
  }, _react["default"].createElement(_Input.InputCore, {
    schema: schema,
    modelName: modelName,
    fieldName: fieldName,
    value: value,
    onChange: onFilterChange,
    inline: true,
    selectOptions: selectOptions,
    customInput: {
      placeholder: 'Enter value...'
    }
  })));
};

var FilterComp = function FilterComp(_ref14) {
  var fieldName = _ref14.fieldName,
      modelName = _ref14.modelName,
      schema = _ref14.schema,
      onFilterChange = _ref14.onFilterChange,
      onFilterSubmit = _ref14.onFilterSubmit,
      onFilterDropdown = _ref14.onFilterDropdown,
      filterInput = _ref14.filterInput,
      selectOptions = _ref14.selectOptions;
  var value = R.prop('value', filterInput);
  var operator = R.prop('operator', filterInput);
  return _react["default"].createElement(_react["default"].Fragment, null, _react["default"].createElement(FilterPopover, {
    schema: schema,
    modelName: modelName,
    fieldName: fieldName,
    value: value,
    operator: operator,
    onFilterChange: onFilterChange,
    onFilterSubmit: onFilterSubmit,
    onFilterDropdown: onFilterDropdown,
    selectOptions: selectOptions
  }));
};

exports.FilterComp = FilterComp;