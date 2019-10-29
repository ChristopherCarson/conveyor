"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.isAutoFocusInput = void 0;

var _react = _interopRequireDefault(require("react"));

var _consts = require("../consts");

var R = _interopRequireWildcard(require("ramda"));

var _inputComponent = require("./inputComponent");

var _defaultTypeMap;

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var includeProps = ['type', 'id', 'value', 'dateFormat', 'labelStr', 'onChange', 'inline', 'options', 'className', 'isClearable', 'isMulti', 'noOptionsMessage', 'onMenuOpen', 'error', 'required', 'customInput', 'customError', 'customLabel', 'autoFocus', 'onKeyDown'];

var isAutoFocusInput = function isAutoFocusInput(type) {
  switch (type) {
    case _consts.inputTypes.STRING_TYPE:
    case _consts.inputTypes.TEXTAREA_TYPE:
    case _consts.inputTypes.EMAIL_TYPE:
    case _consts.inputTypes.URL_TYPE:
    case _consts.inputTypes.PHONE_TYPE:
    case _consts.inputTypes.PASSWORD_TYPE:
    case _consts.inputTypes.INT_TYPE:
    case _consts.inputTypes.CURRENCY_TYPE:
      return true;

    default:
      return false;
  }
};

exports.isAutoFocusInput = isAutoFocusInput;
var defaultTypeMap = (_defaultTypeMap = {}, _defineProperty(_defaultTypeMap, _consts.inputTypes.STRING_TYPE, _inputComponent.InputString), _defineProperty(_defaultTypeMap, _consts.inputTypes.EMAIL_TYPE, _inputComponent.InputString), _defineProperty(_defaultTypeMap, _consts.inputTypes.PHONE_TYPE, _inputComponent.InputString), _defineProperty(_defaultTypeMap, _consts.inputTypes.URL_TYPE, _inputComponent.InputString), _defineProperty(_defaultTypeMap, _consts.inputTypes.TEXTAREA_TYPE, _inputComponent.InputTextArea), _defineProperty(_defaultTypeMap, _consts.inputTypes.INT_TYPE, _inputComponent.InputInt), _defineProperty(_defaultTypeMap, _consts.inputTypes.CURRENCY_TYPE, _inputComponent.InputCurrency), _defineProperty(_defaultTypeMap, _consts.inputTypes.PASSWORD_TYPE, _inputComponent.InputPassword), _defineProperty(_defaultTypeMap, _consts.inputTypes.DATE_TYPE, _inputComponent.InputDate), _defineProperty(_defaultTypeMap, _consts.inputTypes.FILE_TYPE, _inputComponent.InputFile), _defineProperty(_defaultTypeMap, _consts.inputTypes.RADIO_TYPE, _inputComponent.InputRadio), _defineProperty(_defaultTypeMap, _consts.inputTypes.SELECT_TYPE, _inputComponent.InputSelect), _defineProperty(_defaultTypeMap, _consts.inputTypes.CHECKBOX_TYPE, _inputComponent.InputCheckbox), _defineProperty(_defaultTypeMap, _consts.inputTypes.BOOLEAN_TYPE, _inputComponent.InputSwitch), _defaultTypeMap);
/**
 * 'FlexibleInput' is the only entry point. You can instantiate the
 * class and reuse it as many times as needed.
 *
 * @example
 *
 * Example 1: Generate a single instance of your form input.
 *
 *  <FlexibleInput
 *      type={'String'}
 *      value={'Foo'}
 *      onChange={myOnChangeFunc}
 *      id={'my-unique-id'}
 *  />
 *
 *  @example
 *
 *  Example 2: Generate a reusable object
 *
 *
 *  const flexForms = new FlexibleInput({
 *      type: 'String',
 *      value: 'Foo',
 *      onChange: myOnChangeFunc,
 *      id: 'my-unique-id'
 *  })
 *  return flexForms.render()
 *
 *  @example
 *
 *  Example 3: Alter reusable object to create fields with new properties
 *
 *  // It is recommended to pass in a unique 'id' prop for each field.
 *  // In order to do that, change the values using the setValues()
 *  method.
 *
 *
 *  const flexForms = new FlexibleInput({
 *      type: 'String',
 *      value: 'Foo',
 *      onChange: myOnChangeFunc,
 *      id: 'my-unique-id'
 *
 *  })
 *
 *  // all props passed in above remain intact, but 'value' and 'id' are altered:
 *
 *  flexForms.setValues({value:'Bar', id: 'second-unique-id'})
 *
 *  return flexForms.render()
 *
 *  // If the 'type' prop is passed in, all props are cleared and
 *  // default values are set to reflect the new type.
 *
 *  flexForms.setValues({type:'Select'})
 *
 *
 * @example
 *
 * Example 4: Override label and error component
 *
 * // You can override the package's error and label components entirely
 * // by passing in your own function. The customError component must take an
 * // 'error' and 'id' prop, and the customLabel must take 'labelStr' and 'required' attributes.
 *
 *  const CustomError = ({error, id}) => <div style={{'fontSize': '80%', 'color': '#dc3545'}}>{`${ makeThisListAString(error) } foo`}</div>
 *  //
 *  const CustomLabel = ({labelStr, required}) =>
 *      <label htmlFor={id}>{`Custom ${labelStr} ${required ? ' **' : ''}`}</label>
 *
 *  return (
 *      <FlexibleInput
 *          type={'String'}
 *          value={'Foo'}
 *          onChange={myOnChangeFunc}
 *          id={id}
 *          labelStr={'My Label'}
 *          error={['my error', 'my other error']}
 *          customError={CustomError}
 *          customLabel={CustomLabel}
 *      />
 *  )
 *
 *  @example
 *
 *  Example 5: Radio and Select type requires 'options' prop in the following format:
 *
 *  const options = [
 *      {label: 'This is True', value: 'true'},
 *      {label: 'This is False', value: 'false'}
 *  ]
 *  return (
 *      <FlexibleInput
 *          type={'Radio'}
 *          options={options}
 *          value={'false'}
 *          onChange={onChange}
 *          id={id}
 *      />
 *  )
 *
 *  @example
 *
 *  Example 6: Make Custom class that extends FlexibleInput
 *
 * // make your own components (newUseMap) and add them to the class.
 *
 * const newUseMap = {
 *     'input1': input1,
 *     'input2': input2,
 * }
 *
 * export class MyFlex extends FlexibleInput {

 *     constructor (props) {
 *         super(props)
 *         this.useMap = {
 *             ...this.useMap,
 *             ...newUseMap,
 *         }
 *     }
 * }
 *
 * // then use your component:
 *
 * return <MyFlex {...props} />
 *
 * // or create a reusable component:
 *
 * const c = new MyFlex({...props})
 * return c.render()
*/

var FlexibleInput =
/*#__PURE__*/
function (_React$Component) {
  _inherits(FlexibleInput, _React$Component);

  /**
   * @param { string } type - One of following type designators:
   *      Int, TextArea, String, Password, Date, File, Radio, Select, Checkbox, Boolean,
   *      Email, Phone, URL, Currency.
   * @param { string } id - Unique input id
   * @param { any } [value] - Display value. Default: varies with type. Date value
   *      can be a moment object or a string.
   * @param { string } [dateFormat] - Optional value for the DateInput component.
   *      Default: 'YYYY-MM-DD'. Date value as a string should be consistent with
   *      dateFormat See moment.js for other format types
   * @param { string } [labelStr] - String used for built-in <label> component.
   *      Not available for "Boolean" type
   * @param { function } onChange
   * @param { boolean } [inline] - Only used for "Radio" type to signify inline
   *      capability. Default: false
   * @param { any } options - Required for "Radio" and "Select" type. For "Select",
   *      if options is left undefined, the parameter "noOptionsMessage" dictates
   *      the drop down message to be given to the user instead of the options.
   *      Options must be an array of "label"/"value" pairs:
   *          [{label: "Hello", value: "hello"}, {label: "World", value: "world"}]
   * @param { string } [className] - Component css class. Default: varies with type.
   * @param { boolean } [isClearable] - Signifies that "Select" and "Date"
   *      type input components can be cleared of data. Default: true. See
   *      documentation of React Select for more information.
   * @param { boolean } [isMulti] - Signifies that multiple options can be chosen
   *      for a "Select" type component. Default: false. See documentation of
   *      React Select for more information.
   * @param { function } [noOptionsMessage] - "Select" component drop down message
   *      displayed if no options available. Default: () => 'No Options'. See
   *      documentation of React Select for more information.
   * @param { function } onMenuOpen - Required for "Select" component to demonstrate
   *      behavior necessary when drop down menu is opened. See documentation of
   *      React Select for more information.
   * @param { list } [error] - List of error messages to be displayed. If provided,
   *      component class contains the string 'is-invalid' and message is
   *      displayed in red. For the following types: "File", "TextArea", "Int",
   *      "Password", "String", "Boolean", "Checkbox", "Select", "Date", "Radio".
   * @param { boolean } [required] - appends  '*' to the end of a label to indicate
   *      that the field is required. Not available for "Boolean" type
   * @param { object } [customInput] - Overrides any props passed into the component,
   *      or those set by default in this library. For example, to override default
   *      settings for a "Date" component structure the data like so:
   *      {placeholderText:'Click here', fixedHeight:false}
   * @param { object } [customError] - component that takes in an argument
   *      'error' and 'id' and returns an html component in to be displayed below the field
   * @param { object } [customLabel] - label component to be displayed above the filed
   *      not available for 'Checkbox' type
   * @param { boolean } [autoFocus] refers to specific fields (see isAutoFocusInput()) that have
   *      autofocus input feature
   *
   * @returns { object } - Single input component
  */
  function FlexibleInput(props) {
    var _this;

    _classCallCheck(this, FlexibleInput);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(FlexibleInput).call(this, props));

    _this._setValues(props);

    _this._setDefault();

    _this.useMap = _objectSpread({}, defaultTypeMap);
    return _this;
  }
  /**
   * Updates component attributes after instantiating the class.
  */


  _createClass(FlexibleInput, [{
    key: "setValues",
    value: function setValues(props) {
      if (Object.keys(props).includes('type')) {
        this._clearValues();

        this._setValues(props);

        this._setDefault();
      } else {
        this._setValues(props);
      }
    }
  }, {
    key: "_clearValues",
    value: function _clearValues() {
      var _this2 = this;

      R.intersection(Object.keys(this), includeProps).forEach(function (key) {
        _this2[key] = undefined;
        return null;
      });
    }
  }, {
    key: "_setValues",
    value: function _setValues(props) {
      var _this3 = this;

      R.intersection(Object.keys(props), includeProps).forEach(function (key) {
        _this3[key] = props[key];
        return null;
      });
    }
  }, {
    key: "_setDefault",
    value: function _setDefault() {
      switch (this.type) {
        case _consts.inputTypes.STRING_TYPE:
        case _consts.inputTypes.EMAIL_TYPE:
        case _consts.inputTypes.PHONE_TYPE:
        case _consts.inputTypes.URL_TYPE:
        case _consts.inputTypes.TEXTAREA_TYPE:
        case _consts.inputTypes.INT_TYPE:
        case _consts.inputTypes.PASSWORD_TYPE:
        case _consts.inputTypes.CURRENCY_TYPE:
          this['value'] = R.defaultTo('', this['value']);
          this['className'] = R.defaultTo('form-control', this['className']);
          break;

        case _consts.inputTypes.DATE_TYPE:
          // this['dateFormat'] = R.defaultTo('YYYY-MM-DD', this['dateFormat']) //todo: changed
          // this['className'] = R.defaultTo('form-control', this['className']) //todo: changed
          this['isClearable'] = R.defaultTo(true, this['isClearable']);
          break;

        case _consts.inputTypes.FILE_TYPE:
          this['className'] = R.defaultTo('form-control-file', this['className']);
          break;

        case _consts.inputTypes.RADIO_TYPE:
          this['inline'] = R.defaultTo(false, this['inline']);
          this['className'] = R.defaultTo('form-check', this['className']);
          break;

        case _consts.inputTypes.SELECT_TYPE:
          this['className'] = R.defaultTo('basic-single', this['className']);
          this['isClearable'] = R.defaultTo(true, this['isClearable']);
          this['isMulti'] = R.defaultTo(false, this['isMulti']);
          this['noOptionsMessage'] = R.defaultTo(function () {
            return 'No Options';
          }, this['noOptionsMessage']);
          break;

        case _consts.inputTypes.CHECKBOX_TYPE:
          this['value'] = R.defaultTo(false, this['value']);
          this['className'] = R.defaultTo('form-group form-check', this['className']);
          break;

        case _consts.inputTypes.BOOLEAN_TYPE:
          this['value'] = R.defaultTo(false, this['value']);
          this['className'] = R.defaultTo('form-check', this['className']);
          this['inline'] = R.defaultTo(true, this['inline']);
          break;
      }

      if (typeof this['error'] === 'string') {
        this['error'] = [this['error']];
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this4 = this;

      this._setValues(this.props);

      this._setDefault();

      var reducer = function reducer(obj, key) {
        obj[key] = _this4[key];
        return obj;
      };

      var attrs = includeProps.reduce(reducer, {});
      var comp = this.useMap[this.type];

      if (!comp) {
        throw new Error("Invalid type \"".concat(this.type, "\" for form component."));
      }

      return comp(attrs);
    }
  }]);

  return FlexibleInput;
}(_react["default"].Component);

var _default = FlexibleInput;
exports["default"] = _default;