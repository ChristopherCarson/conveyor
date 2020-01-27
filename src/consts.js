const INT_TYPE = 'int'
const TEXTAREA_TYPE = 'text'
const STRING_TYPE = 'string' // keep name
const EMAIL_TYPE = 'email'
const PHONE_TYPE = 'phone'
const URL_TYPE = 'url'
const PASSWORD_TYPE = 'password'
const DATE_TYPE = 'date'
const FILE_TYPE = 'file'
const RADIO_TYPE = 'radio'
const SELECT_TYPE = 'select'
const CREATABLE_STRING_SELECT_TYPE = 'creatable_string_select'
const CHECKBOX_TYPE = 'checkbox'
const BOOLEAN_TYPE = 'boolean'
const CURRENCY_TYPE = 'currency'
const ID_TYPE = 'ID'

export const inputTypes = {
  STRING_TYPE,
  FLOAT_TYPE: 'float',
  INT_TYPE,
  DATE_TYPE,
  TEXTAREA_TYPE,
  ENUM_TYPE: 'enum',
  URL_TYPE,
  PHONE_TYPE,
  EMAIL_TYPE,
  BOOLEAN_TYPE,
  CURRENCY_TYPE,
  FILE_TYPE,
  SELECT_TYPE,
  CREATABLE_STRING_SELECT_TYPE,
  PASSWORD_TYPE,
  RADIO_TYPE,
  ID_TYPE,
  CHECKBOX_TYPE, // not used
  MANY_TO_ONE_TYPE: 'ManyToOne',  // single 'ToOne'
  ONE_TO_ONE_TYPE: 'OneToOne',  // single 'ToOne'
  ONE_TO_MANY_TYPE: 'OneToMany',  // multiple
  MANY_TO_MANY_TYPE: 'ManyToMany' // multiple
}

export const ASC = 'asc'
export const DESC = 'desc'
