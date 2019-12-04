import React from 'react'
import { InputCore } from '../form/Input'
import { getInputType } from '../form/InputType'
import ReactSVG from 'react-svg'
import { Tooltip } from 'react-tippy'
import * as R from 'ramda'
import { inputTypes } from '../consts'
import FlexibleInput from '../input'
import { Modal } from '../Modal'
import { getFieldLabel } from '../utils/schemaGetters.js'

// todo: fix this
// band-aid solution for filter types that are still broken;
// currency filter is not broken, but does not have adequate permissions check
// and can give away cost info indirectly by filtering via cost value
export const isFilterable = ({schema, modelName, fieldName}) => {
  const inputType = getInputType({ schema, modelName, fieldName })
  return !(
    (inputType === inputTypes.ENUM_TYPE) ||
    (inputType === inputTypes.RELATIONSHIP_SINGLE) ||
    (inputType === inputTypes.RELATIONSHIP_MULTIPLE) ||
    (inputType === inputTypes.DATE_TYPE) ||
    (inputType === inputTypes.PHONE_TYPE) ||
    (inputType === inputTypes.BOOLEAN_TYPE) ||
    // todo: add back currency once filter permissions added
    (inputType === inputTypes.CURRENCY_TYPE)
  )
}

export const isColFilterable = ({schema, modelName, fieldName, tableOptions, filterable}) =>
  !!tableOptions && filterable && isFilterable({schema, modelName, fieldName})

export const isTableFilterable = ({schema, modelName, fieldOrder, tableOptions, filterable}) => {
  const boolList = R.map(fieldName =>
    isColFilterable({ schema, modelName, fieldName, tableOptions, filterable }),
    fieldOrder
  )
  return !R.isEmpty(R.filter(R.identity, boolList))
}

const isStringOrInt = ({ schema, modelName, fieldName }) => {
  const fieldType = R.pathOr(null, [modelName, 'fields', fieldName, 'type'], schema)
  return fieldType === 'int' || fieldType === 'string'
}

const getFilterableFields = ({ modelName, schema }) => {
  const fields = R.pathOr([], [modelName, 'fieldOrder'], schema)
  const filterables = fields.filter(
    fieldName => isFilterable({ schema, modelName, fieldName })
      && isStringOrInt({ schema, modelName, fieldName }) // for now, filter only strings/ints
  )
  return filterables
}

const FilterButtons = ({ modelName, onFilterSubmit, clearFilters, onAdd }) => (
  <div className='mt-3'>
    <button
      className='btn btn-primary btn-sm'
      onClick={() => onAdd({ modelName })}
    >+ Add Rule</button>
    <div className='d-inline float-right'>
      <div className='btn-group'>
        <button
          className='btn btn-success btn-sm'
          onClick={() => onFilterSubmit({ modelName })}
        >Apply All</button>
        <button
          className='btn btn-outline-danger btn-sm'
          onClick={() => {
            clearFilters({ modelName })
            onFilterSubmit({ modelName })
          }}
        >Reset</button>
      </div>
    </div>
  </div>
)

const formatFilter = ({
  fieldName,
  index,
  modelName,
  schema,
  data,
  onChange,
  selectOptions,
  filterOrder,
  onFilterChange,
  onFilterSubmit,
  onFilterRadio,
  filterInputs
}) => {
  const filterInput = R.prop(fieldName, filterInputs)
  const filterables = getFilterableFields({ modelName, schema })
  const toOptions = fieldName => ({
    label: getFieldLabel({ schema, modelName, fieldName, data }),
    value: {
      fieldName,
      type: getInputType({ schema, modelName, fieldName })
    }
  })
  const fieldOptions = filterables.map(fieldName => toOptions(fieldName))
  const value = toOptions(filterOrder[index])
  return (
    <li key={index} className='list-group-item'>
      <FlexibleInput
        type={inputTypes.SELECT_TYPE}
        onChange={evt => onChange({
          modelName,
          field: R.path(['value', 'fieldName'], evt),
          index
        })}
        value={value}
        options={fieldOptions}
        id={`${modelName}-filter-dropdown`}
        noOptionsMessage='(no filterable fields)'
        customInput={{
          placeholder: 'Select field...'
        }}
      />
      <FilterComp {...{
        fieldName,
        modelName,
        schema,
        onFilterChange: evt => onFilterChange({
          modelName,
          ...evt
        }),
        onFilterSubmit,
        onFilterRadio,
        filterInput,
        selectOptions
      }}
      />
    </li>
  )
}

const ActiveFilters = ({
  modelName,
  schema,
  data,
  addFilter,
  onChange,
  selectOptions,
  filterOrder,
  clearFilters,
  onFilterChange,
  onFilterSubmit,
  onFilterRadio,
  filterInputs
}) => {
  return (
    <div id={'active-filters-' + modelName} className='mb-2'>
      <ul className="list-group">{
        R.isEmpty(filterOrder) || R.isNil(filterOrder)
          ? <li key={-1} className='list-group-item'>N/A</li>
          : filterOrder.map((fieldName, index) =>
              formatFilter({
                fieldName,
                index,
                modelName,
                schema,
                data,
                onChange,
                selectOptions,
                filterOrder,
                onFilterChange,
                onFilterSubmit,
                onFilterRadio,
                filterInputs
              })
            )
      }</ul>
      <FilterButtons {...{
        modelName,
        onFilterSubmit,
        clearFilters,
        onAdd: addFilter }}
      />
    </div>
  )
}

export const FilterModal = ({
  modelName,
  schema,
  selectOptions,
  data,
  addFilter,
  clearFilters,
  changeField,
  onFilterChange,
  onFilterSubmit,
  onFilterRadio,
  currentFilters,
  filterOrder,
  filterInputs
}) => (
  <Modal
    id={'filter-' + modelName}
    title={'Filters - ' + modelName}
    children={
      <div>
        <ActiveFilters {...{
          modelName,
          schema,
          data,
          addFilter,
          onChange: changeField,
          selectOptions,
          currentFilters,
          filterOrder,
          clearFilters,
          onFilterChange,
          onFilterSubmit,
          onFilterRadio,
          filterInputs
        }} />
      </div>
    }
  />
)

export const FilterModalButton = ({ modelName, currentFilters }) => (
  <button
    className={'btn btn-sm btn-outline-primary'}
    data-toggle='modal'
    data-target={'#filter-' + modelName}
  >Filter
    <ReactSVG
      src={`/static/img/filter.svg`}
      className='header-icon ml-2'
      svgStyle={{
        width: '12px',
        height: '12px',
        fill: R.isEmpty(currentFilters) ? 'black' : 'lightgreen'
      }}
    />
  </button>
)

const FilterRadio = ({
  modelName,
  fieldName,
  operator,
  onFilterRadio,
  options
}) => {
  return (
    <React.Fragment>
      <FlexibleInput
        type={inputTypes.RADIO_TYPE}
        onChange={(val) => onFilterRadio({
          modelName,
          fieldName,
          operator: val
        })}
        value={operator}
        options={options}
        id={`${modelName}-${fieldName}-filter-radio`}
      />
    </React.Fragment>
  )
}

const stringOptions = [
  { label: 'Includes', value: 'INCLUDES' },
  { label: 'Equals', value: 'EQUALS' }
]

const numberOptions = [
  { label: '<', value: 'lt' },
  { label: '<=', value: 'lte' },
  { label: '=', value: 'eq' },
  { label: '!=', value: 'neq' },
  { label: '>', value: 'gt' },
  { label: '>=', value: 'gte' },
]

const relOptions = [
  { label: 'Includes', value: 'INCLUDES' }
]

const enumOptions = [
  { label: 'Includes', value: 'INCLUDES' },
  { label: 'Excludes', value: 'EXCLUDES' }
]

const FilterApplyButton = ({
  schema,
  modelName,
  fieldName,
  operator,
  onFilterSubmit,
  onFilterRadio
}) => {
  if (R.isNil(fieldName) || R.isEmpty(fieldName)) {
    return null
  }

  const inputType = getInputType({ schema, modelName, fieldName })

  let options
  switch (inputType) {
    case inputTypes.INT_TYPE:
    case inputTypes.FLOAT_TYPE:
    case inputTypes.CURRENCY_TYPE:
      options = numberOptions
      break;
    case inputTypes.ENUM_TYPE:
      options = enumOptions
      break;
    case inputTypes.RELATIONSHIP_SINGLE:
    case inputTypes.RELATIONSHIP_MULTIPLE:
      options = relOptions
      break;
    default:
      options = stringOptions
  }
  return <FilterRadio {...{
    modelName,
    fieldName,
    operator,
    onFilterSubmit,
    onFilterRadio,
    options
  }}/>
}

// todo: finish
  // case inputTypes.DATE_TYPE:
  // case inputTypes.PHONE_TYPE:
  // case inputTypes.BOOLEAN_TYPE:

const FilterPopover = ({
  schema,
  modelName,
  fieldName,
  value,
  operator,
  onFilterChange,
  onFilterSubmit,
  onFilterRadio,
  selectOptions
}) => (
  <div style={{ 'minWidth': '350px', 'textAlign': 'left' }}>
    <InputCore {...{
      schema,
      modelName,
      fieldName,
      value,
      onChange: onFilterChange,
      inline: true,
      selectOptions
    }} />
    <FilterApplyButton {...{
      schema,
      modelName,
      fieldName,
      operator,
      onFilterSubmit,
      onFilterRadio}} />
  </div>
)

export const FilterComp = ({
  fieldName,
  modelName,
  schema,
  onFilterChange,
  onFilterSubmit,
  onFilterRadio,
  filterInput,
  selectOptions
}) => {
  const value = R.prop('value', filterInput)
  const operator = R.prop('operator', filterInput)
  return (
    <React.Fragment>
      <FilterPopover {...{
        schema,
        modelName,
        fieldName,
        value,
        operator,
        onFilterChange,
        onFilterSubmit,
        onFilterRadio,
        selectOptions
      }} />
    </React.Fragment>
  )
}
