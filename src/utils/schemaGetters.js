import * as R from 'ramda'

export const getFieldLabel = ({ schema, modelName, fieldName, data = {} }) => {
  const displayName = R.pathOr('No Name Found', [modelName, 'fields', fieldName, 'displayName'], schema)
  if (R.type(displayName) === 'Function') {
    return displayName({ schema, modelName, data })
  }
  return displayName
}

export const getModelLabel = ({ schema, modelName, data, ...props }) => {
  const displayName = R.pathOr('No Name Found', [modelName, 'displayName'], schema)
  if (R.type(displayName) === 'Function') {
    return displayName({ schema, modelName, data, ...props })
  }
  return displayName
}

export const getModelLabelPlural = ({ schema, modelName, data, user, ...props }) => {
  const displayName = R.pathOr('No Name Found', [modelName, 'displayNamePlural'], schema)
  if (R.type(displayName) === 'Function') {
    return displayName({ schema, modelName, data, user, ...props })
  }
  return displayName
}

export const getModel = (schema, modelName) => (
  R.prop(modelName, schema)
)

export const getModelAttribute = (schema, modelName, attributeName) => (
  R.pipe(
    getModel,
    R.prop(attributeName)
  )(schema, modelName)
)

export const getActions = (schema, modelName) => {
  return getModelAttribute(schema, modelName, 'actions')
}

export const getFields = (schema, modelName) => (
  getModelAttribute(schema, modelName, 'fields')
)

export const getField = (schema, modelName, fieldName) => (
  R.pipe(
    getFields,
    R.prop(fieldName)
  )(schema, modelName)
)

const getShownFields = ({ schema, modelName, type, node = {} }) => {
  const fieldOrder = R.prop('fieldOrder', getModel(schema, modelName))
  return R.filter(fieldName => {
    let show = R.prop(type, getField(schema, modelName, fieldName))
    if (R.type(show) === 'Function') {
      show = show({
        schema, modelName, fieldName, node
      })
    }
    return show
  }, fieldOrder)
}

export const getRequiredFields = (schema, modelName) => {
  return getShownFields({ schema, modelName, type: 'required' })
}

export const getCreateFields = ({ schema, modelName, user, ...props }) => {
  const createFieldOrder = R.prop('createFieldOrder', getModel(schema, modelName))
  if (R.type(createFieldOrder) === 'Function') {
    return createFieldOrder({ schema, modelName, user, ...props })
  }
  else if (R.type(createFieldOrder) === 'Array') {
    return createFieldOrder
  }
  return getShownFields({ schema, modelName, type: 'showCreate' })
}

export const getHasIndex = (schema, modelName) => {
  return R.prop('hasIndex', getModel(schema, modelName))
}

export const getDetailFields = ({ schema, modelName, node, ...props }) => {
  const detailFieldOrder = R.prop('detailFieldOrder', getModel(schema, modelName))
  if (R.type(detailFieldOrder) === 'Function') {
    return detailFieldOrder({ schema, modelName, node, ...props })
  }
  else if (R.type(detailFieldOrder) === 'Array') {
    return detailFieldOrder
  }  return getShownFields({ schema, modelName, type: 'showDetail', node })
}

export const getIndexFields = ({ schema, modelName, data, user, ...props }) => {
  const indexFieldOrder = R.prop('indexFieldOrder', getModel(schema, modelName))
  if (R.type(indexFieldOrder) === 'Function') {
    return indexFieldOrder({ schema, modelName, data, user, ...props })
  }
  else if (R.type(indexFieldOrder) === 'Array') {
    return indexFieldOrder
  }  return getShownFields({ schema, modelName, type: 'showIndex' })
}

export const getTooltipFields = (schema, modelName) => {
  return getShownFields({ schema, modelName, type: 'showTooltip' })
}
export const getEnumChoices = (schema, modelName, fieldName) => {
  return R.prop('choices', getField(schema, modelName, fieldName))
}

export const getEnumChoiceOrder = (schema, modelName, fieldName) => {
  return R.prop('choiceOrder', getField(schema, modelName, fieldName))
}
