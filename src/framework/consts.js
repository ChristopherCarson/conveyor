export const INT_TYPE = 'int'
export const TEXTAREA_TYPE = 'text'
export const STRING_TYPE = 'string' // keep name
export const EMAIL_TYPE = 'email'
export const PHONE_TYPE = 'phone'
export const URL_TYPE = 'url'
export const PASSWORD_TYPE = 'password'
export const DATE_TYPE = 'date'
export const FILE_TYPE = 'file'
export const RADIO_TYPE = 'radio'
export const SELECT_TYPE = 'select'
export const CHECKBOX_TYPE = 'checkbox'
export const BOOLEAN_TYPE = 'boolean'
export const CURRENCY_TYPE = 'currency'

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
  RELATIONSHIP_SINGLE: 'relSingle',
  RELATIONSHIP_MULTIPLE: 'relMultiple',
  PASSWORD_TYPE,
  RADIO_TYPE,
  CHECKBOX_TYPE // not used
}

export const relInputTypes = {
  ONE_TO_MANY_TYPE: 'OneToMany',
  MANY_TO_ONE_TYPE: 'ManyToOne',
  ONE_TO_ONE_TYPE: 'OneToOne',
  MANY_TO_MANY_TYPE: 'ManyToMany'
}
