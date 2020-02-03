"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DESC = exports.ASC = exports.inputTypes = void 0;
var INT_TYPE = 'int';
var TEXTAREA_TYPE = 'text';
var STRING_TYPE = 'string'; // keep name

var EMAIL_TYPE = 'email';
var PHONE_TYPE = 'phone';
var URL_TYPE = 'url';
var PASSWORD_TYPE = 'password';
var DATE_TYPE = 'date';
var FILE_TYPE = 'file';
var RADIO_TYPE = 'radio';
var SELECT_TYPE = 'select';
var CREATABLE_STRING_SELECT_TYPE = 'creatable_string_select';
var CHECKBOX_TYPE = 'checkbox';
var BOOLEAN_TYPE = 'boolean';
var CURRENCY_TYPE = 'currency';
var ID_TYPE = 'ID';
var inputTypes = {
  STRING_TYPE: STRING_TYPE,
  FLOAT_TYPE: 'float',
  INT_TYPE: INT_TYPE,
  DATE_TYPE: DATE_TYPE,
  TEXTAREA_TYPE: TEXTAREA_TYPE,
  ENUM_TYPE: 'enum',
  URL_TYPE: URL_TYPE,
  PHONE_TYPE: PHONE_TYPE,
  EMAIL_TYPE: EMAIL_TYPE,
  BOOLEAN_TYPE: BOOLEAN_TYPE,
  CURRENCY_TYPE: CURRENCY_TYPE,
  FILE_TYPE: FILE_TYPE,
  SELECT_TYPE: SELECT_TYPE,
  CREATABLE_STRING_SELECT_TYPE: CREATABLE_STRING_SELECT_TYPE,
  PASSWORD_TYPE: PASSWORD_TYPE,
  RADIO_TYPE: RADIO_TYPE,
  ID_TYPE: ID_TYPE,
  CHECKBOX_TYPE: CHECKBOX_TYPE,
  // not used
  MANY_TO_ONE_TYPE: 'ManyToOne',
  // single 'ToOne'
  ONE_TO_ONE_TYPE: 'OneToOne',
  // single 'ToOne'
  ONE_TO_MANY_TYPE: 'OneToMany',
  // multiple
  MANY_TO_MANY_TYPE: 'ManyToMany' // multiple

};
exports.inputTypes = inputTypes;
var ASC = 'asc';
exports.ASC = ASC;
var DESC = 'desc';
exports.DESC = DESC;