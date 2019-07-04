import React from 'react'
import { Redirect } from 'react-router-dom'
import * as R from 'ramda'
import Input, { relationshipLabelFactory } from './Input'
import { getModel, getFields, getActions, getField } from '../utils/schemaGetters'
import { Breadcrumbs } from './Breadcrumbs'
import { getType } from '../utils/getType'
import { getModelLabel } from '../Detail'

const getFieldErrorCreate = ({ formStack, stackIndex, fieldName }) => (
  R.path(['stack', stackIndex, 'errors', fieldName], formStack)
)

const getCreateFieldOrder = (schema, modelName) => {
  const fields = getFields(schema, modelName)

  const filtered = R.pipe(
    R.prop('fieldOrder'),
    R.filter(fieldName => R.path([fieldName, 'showCreate'], fields))
  )(getModel(schema, modelName))

  return filtered
}

export const makeCreateLabel = ({ schema, modelName, fieldName, ...props }) => {
  const type = R.prop('type', getField(schema, modelName, fieldName))
  if (R.type(type) !== 'Object') {
    return null
  }
  const actions = getActions(schema, modelName)
  const onStackCreate = R.path(['create', 'onStackCreate'], actions)
  const targetModel = R.path([modelName, 'fields', fieldName, 'type', 'target'], schema)

  const onClick = () => onStackCreate({ modelName: targetModel })

  const CreateLabel = relationshipLabelFactory({ schema, modelName, fieldName, onClick, ...props })
  return CreateLabel
}

// TODO: improve the way the disabled fields are handled, instead of directly
// holding value at ['stack', index, 'fields', 'fieldName'], hold an object
// with disabled and value key. This will also allow for other metadata to
// be held there if necessary
const isFieldDisabled = ({ schema, modelName, fieldName, form }) => {
  const type = getType({ schema, modelName, fieldName })

  if (type.includes('ToMany')) {
    return R.path(['fields', fieldName, 0, 'disabled'], form)
  } else {
    return R.path(['fields', fieldName, 'disabled'], form)
  }
}

const getDisabledValue = ({ schema, modelName, fieldName, form }) => {
  const type = getType({ schema, modelName, fieldName })

  if (type.includes('ToMany')) {
    return R.path(['fields', fieldName, 0, 'label'], form)
  } else {
    return R.path(['fields', fieldName, 'label'], form)
  }
}

const Create = ({
  schema,
  modelName,
  formStack,
  selectOptions,
  getEnumOptions,
  ...props
}) => {
  const stackIndex = R.prop('index', formStack)
  const originFieldName = R.prop('originFieldName', formStack)

  if (stackIndex === -1) {
    return <Redirect to={R.propOr('/', 'originPath', formStack)} />
  }
  const origin = R.prop('originModelName', formStack)

  const fieldOrder = getCreateFieldOrder(schema, modelName)
  if (origin && stackIndex === 0) {
    const index = fieldOrder.indexOf(originFieldName)
    if (index !== -1) { fieldOrder.splice(index, 1) }
    fieldOrder.splice(0, 0, originFieldName)
  }
  const stack = R.prop('stack', formStack)
  const form = R.prop(stackIndex, stack)
  const actions = getActions(schema, modelName)
  const onChange = R.path(['create', 'onInputChange'], actions)
  const onCancel = R.path(['create', 'onCancel'], actions)
  const onSave = R.path(['create', 'onSave'], actions)
  const disableButtons = stackIndex !== stack.length - 1

  return (
    <div className='container'>
      <Breadcrumbs schema={schema} formStack={formStack} />
      <h1>Create {getModelLabel({ schema, modelName })}</h1>
      <div>* Indicates a Required Field</div>
      <br />
      <div>{fieldOrder.map(fieldName => {
        const disabled = isFieldDisabled({ schema, modelName, fieldName, form })
        const value = disabled
          ? getDisabledValue({ schema, modelName, fieldName, form })
          : R.path(['fields', fieldName], form)
        const error = getFieldErrorCreate({ formStack, stackIndex, fieldName })

        return <Input key={fieldName} {...{
          schema,
          modelName,
          fieldName,
          value,
          error,
          selectOptions,
          getEnumOptions,
          onChange,
          disabled,
          formStack,
          customLabel: makeCreateLabel({ schema, modelName, fieldName, ...props }),
          ...props
        }} />
      })}</div>
      {disableButtons && <p className='text-danger'>Cannot save or cancel until all subsequent creates are resolved.</p>}
      <div className='btn-group'>
        <button
          className='btn btn-success'
          role='button'
          onClick={() => onSave({ modelName })}
          disabled={disableButtons}
        >Submit</button>
        <button
          className='btn'
          role='button'
          onClick={() => onCancel()}
          disabled={disableButtons}
        >Cancel</button>
      </div>
    </div>
  )
}

export default Create
