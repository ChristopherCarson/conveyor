import React from 'react'
import { Table as DefaultTable } from './table/Table'
import * as R from 'ramda'
import CreateButton from './CreateButton'
import { getActions, getHasIndex, getIndexFields, getModelLabelPlural } from './utils/schemaGetters'
import { Redirect } from 'react-router-dom'
import { isCreatable } from './Utils'

export const DefaultIndexTitle = ({ schema, modelName, path, data, user }) => {
  const actions = getActions(schema, modelName)
  const onCreateClick = R.path(['create', 'onIndexCreate'], actions)
  const onClick = () => onCreateClick({ modelName, path })
  const creatable = isCreatable({ schema, modelName, data, user }) // todo: custom
  //todo: custom: getModelLabelPlural()
  return (
    <div style={{ marginBottom: '10px' }}>
      <h3 className='d-inline'>
        {getModelLabelPlural({schema, modelName, data, user})}
      </h3>
      {creatable && <div className='float-right'>
        <CreateButton {...{ onClick }} />
      </div>}
    </div>
  )
}

const Index = ({
  schema,
  modelName,
  data,
  modalData,
  editData,
  selectOptions,
  path,
  tooltipData,
  Title = DefaultIndexTitle,
  Table = DefaultTable,
  user,
  tableOptions
}) => {
  if (!(getHasIndex(schema, modelName))) {
    return <Redirect to='/' />
  }

  const fieldOrder = getIndexFields({ schema, modelName, data, user }) // todo: custom
  const actions = getActions(schema, modelName)
  const onDelete = R.path(['delete', 'onIndexDelete'], actions)
  const onEditSubmit = R.path(['edit', 'onIndexEditSubmit'], actions)

  return (<div className='container'>
    <Title {...{ schema, modelName, path, data, user }} />
      <Table {...{
        schema,
        modelName,
        data,
        onDelete,
        onEditSubmit,
        tooltipData,
        fieldOrder,
        selectOptions,
        editData,
        modalData,
        user,
        tableOptions
      }} />
    </div>)
}

export default Index
