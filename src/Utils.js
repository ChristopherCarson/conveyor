import * as R from 'ramda'
import { getField, getModel } from './utils/schemaGetters'

export const capitalizeFirstChar = (str) => str.replace(/^./, str => str.toUpperCase())

export const spaceOnCapitalLetter = (str) => str.replace(/([A-Z])/g, ' $1')

export const underscoreToSpace = (str) => str.replace(/_/g, ' ')

export const trimWhitespaceBetweenWords = (str) => str.replace(/\s\s+/g, ' ')

export const humanize = str => R.pipe(
  spaceOnCapitalLetter,
  capitalizeFirstChar,
  underscoreToSpace,
  trimWhitespaceBetweenWords,
  R.trim
)(str)

export const titleize = title => {
  let strArr = title.split(' ')
  strArr = strArr.map(str => {
    return str.charAt(0).toUpperCase() + str.slice(1)
  })
  return strArr.join(' ')
}

export const getCellOverride = (schema, modelName, fieldName) => (
  R.path([modelName, 'fields', fieldName, 'components', 'cell'], schema)
)

export const getDetailFieldOverride = (schema, modelName, fieldName) => (
  R.path([modelName, 'fields', fieldName, 'components', 'detail'], schema)
)

export const getDetailLabelOverride = (schema, modelName, fieldName) => (
  R.path([modelName, 'fields', fieldName, 'components', 'detailLabel'], schema)
)

export const getDetailValueOverride = (schema, modelName, fieldName) => (
  R.path([modelName, 'fields', fieldName, 'components', 'detailValue'], schema)
)

export const getInputOverride = (schema, modelName, fieldName) => (
  R.path([modelName, 'fields', fieldName, 'components', 'input'], schema)
)

export const getCreateOverride = (schema, modelName) => (
  R.path([modelName, 'components', 'create'], schema)
)

export const getCreateTitleOverride = (schema, modelName) => (
  R.path([modelName, 'components', 'createTitle'], schema)
)

export const getCreatePageOverride = (schema, modelName) => (
  R.path([modelName, 'components', 'createPage'], schema)
)

export const getDetailOverride = (schema, modelName) => (
  R.path([modelName, 'components', 'detail'], schema)
)

export const getDetailTitleOverride = (schema, modelName) => (
  R.path([modelName, 'components', 'detailTitle'], schema)
)

export const getDetailPageOverride = (schema, modelName) => (
  R.path([modelName, 'components', 'detailPage'], schema)
)

export const getIndexOverride = (schema, modelName) => (
  R.path([modelName, 'components', 'index'], schema)
)

export const getIndexTitleOverride = (schema, modelName) => (
  R.path([modelName, 'components', 'indexTitle'], schema)
)

export const getIndexPageOverride = (schema, modelName) => (
  R.path([modelName, 'components', 'indexPage'], schema)
)

// override component skipped only if 'null' (undefined by default)
export const skipOverride = (component) => component === null

export const getEnumLabel = ({ schema, modelName, fieldName, value }) => {
  if (value === null) {
    return 'N/A'
  }
  const field = getField(schema, modelName, fieldName)
  return R.pathOr('Value Not Found', ['choices', value], field)
}

/**
 * IMPORTANT:
 *
 * For isTableEditable, isRowEditable, isFieldEditable, is TableDeletable,
 * isDeletable, & isCreatable
 *
 * modelName must match any 'node' (or data[n]) __typename
 * parent 'node' must be labeled 'parentNode'
 */

export const isTableEditable = ({ schema, modelName, data, user, parentNode, fieldOrder, customProps }) => {
  return (
    !R.isEmpty(data.filter(node => isRowEditable({
      schema,
      modelName,
      user,
      node,
      parentNode,
      fieldOrder,
      customProps
    })))
  )
}

//isRowEditable loops over all displayed fields to determine if the row is editable
export const isRowEditable = ({ schema, modelName, node, parentNode, user, fieldOrder, customProps }) => {
  for (const index in fieldOrder) {
    const fieldName = R.prop(index, fieldOrder)
    if (isFieldEditable({
      schema,
      modelName,
      fieldName,
      node,
      parentNode,
      user,
      fieldOrder,
      customProps
    })) {
      return true
    }
  }
  return false
}

export const isFieldEditable = ({ schema, modelName, fieldName, node, parentNode, user, customProps }) => {
  const editable = R.propOr(!R.equals('id', fieldName), 'editable', getField(schema, modelName, fieldName))
  if (R.type(editable) === 'Boolean') {
    return editable
  } else if (R.type(editable) === 'Function') {
    return editable({ schema, modelName, fieldName, node, parentNode, user, customProps })
  } else {
    return false
  }
}

export const isTableDeletable = ({ schema, modelName, data, parentNode, user, customProps }) => {
  return (
    !R.isEmpty(data.filter(node => isDeletable({
      schema,
      modelName,
      node,
      parentNode,
      user,
      customProps
    })))
  )
}

export const isDeletable = ({ schema, modelName, node, parentNode, user, customProps }) => {
  const deletable = R.propOr(true, 'deletable', getModel(schema, modelName))
  if (R.type(deletable) === 'Boolean') {
    return deletable
  } else if (R.type(deletable) === 'Function') {
    return deletable({ schema, modelName, node, parentNode, user, customProps })
  } else {
    return false
  }
}

export const isCreatable = ({ schema, modelName, user, parentNode, data, customProps }) => {
  const creatable = R.propOr(true, 'creatable', getModel(schema, modelName))
  if (R.type(creatable) === 'Boolean') {
    return creatable
  } else if (R.type(creatable) === 'Function') {
    return creatable({ schema, modelName, user, parentNode, data, customProps })
  } else {
    return false
  }
}

export const shouldDisplay = ({schema, modelName, id, fieldName, node, displayCondition, customProps}) => {
  if (R.type(displayCondition) === 'Boolean') {
    return displayCondition
  } else if (R.type(displayCondition) === 'Function') {
    return displayCondition({schema, modelName, id, fieldName, node, customProps})
  } else {
    return true
  }
}