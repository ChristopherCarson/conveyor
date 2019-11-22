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

const AddFilter = ({ modelName, schema, data, onClick, onChange, value }) => {
  const filterables = getFilterableFields({ modelName, schema })
  const fieldOptions = filterables.map(fieldName => ({
    label: getFieldLabel({ schema, modelName, fieldName, data }),
    value: getInputType({ schema, modelName, fieldName })
  }))
  return (
    <div id='add-filter'>
      <div id='filter-dropdown' className='d-inline-block mr-2 w-75'>
        <FlexibleInput
          type={inputTypes.SELECT_TYPE}
          onChange={evt => onChange({
            modelName,
            field: evt
          })}
          value={value}
          options={fieldOptions}
          id={`${modelName}-filter-dropdown`}
          noOptionsMessage='(no filterable fields)'
          customInput={{
            placeholder: 'Select field...'
          }}
        />
      </div>
      <div className='text-right d-inline-block'>
        <button
          className='btn btn-primary btn-sm'
          disabled={R.isNil(value)}
          onClick={() => onClick({ modelName, field: value })}
        >Add</button>
      </div>
    </div>
  )
}

const ActiveFilters = ({ modelName, currentFilters }) => {
  return (
    <div id={'active-filters-' + modelName} className='mb-2'>
      <ul className="list-group">{
        R.isEmpty(currentFilters) || R.isNil(currentFilters)
          ? <li key={-1} className='list-group-item'>N/A</li>
          : currentFilters.map((filter, index) => <li key={index} className='list-group-item'>{filter}</li>)
      }</ul>
      <div className='text-right mt-3'>
        <button className='btn btn-success btn-sm mr-2'>Apply All</button>
        <button className='btn btn-outline-danger btn-sm'>Reset</button>
      </div>
    </div>
  )
}

export const FilterModal = ({ modelName, schema, data, addFilter, changeField, selectedField, currentFilters }) => (
  <Modal
    id={'filter-' + modelName}
    title={'Filters - ' + modelName}
    children={
      <div>
        <p className='font-weight-bold'>Add Filter</p>
        <AddFilter {...{
          modelName,
          schema,
          data,
          onClick: addFilter,
          onChange: changeField,
          value: selectedField
        }}/>
        <p className='font-weight-bold'>Selected Filters</p>
        <ActiveFilters {...{ modelName, currentFilters }} />
      </div>
    }
  />
)

export const FilterModalButton = ({ modelName }) => (
  <button
    className={'btn btn-sm btn-outline-primary'}
    data-toggle='modal'
    data-target={'#filter-' + modelName}
  >Filter
    <ReactSVG
      src={`/static/img/filter.svg`}
      className='header-icon ml-2'
      svgStyle={{width: '12px', height: '12px', fill: 'black'}}
    />
  </button>
)



const displayFilter = ({
  schema,
  modelName,
  fieldName,
  value,
  operator,
  onFilterChange,
  onFilterSubmit,
  onFilterRadio,
  selectOptions,
  onMenuOpen
}) => {
  return <FilterPopover {...{
    schema,
    modelName,
    fieldName,
    value,
    operator,
    onFilterChange,
    onFilterSubmit,
    onFilterRadio,
    selectOptions,
    onMenuOpen
  }} />
}

const FilterRadio = ({ modelName, fieldName, operator, onFilterSubmit, onFilterRadio, options }) => {
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
      <div className='btn-group'>
        <button
          className='btn btn-sm btn-outline-primary'
          onClick={() => onFilterSubmit({ modelName, fieldName, operator })}
        >Apply</button>
        <button
          className='btn btn-sm btn-outline-secondary'
          onClick={() => onFilterSubmit({ modelName, fieldName, operator: null })}
        >Reset</button>
      </div>
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

const FilterApplyButton = ({ schema, modelName, fieldName, operator, onFilterSubmit, onFilterRadio }) => {
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
  return <FilterRadio {...{ modelName, fieldName, operator, onFilterSubmit, onFilterRadio, options }} />
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
  selectOptions,
  onMenuOpen
}) => (
  <div style={{ 'minWidth': '350px', 'textAlign': 'left' }}>
    <InputCore {...{
      schema,
      modelName,
      fieldName,
      value,
      onChange: onFilterChange,
      inline: true,
      selectOptions,
      onMenuOpen,
    }} />
    <FilterApplyButton {...{schema, modelName, fieldName, operator, onFilterSubmit, onFilterRadio}} />
  </div>
)

export const FilterComp = ({
  fieldName,
  modelName,
  schema,
  onFilterChange,
  onFilterSubmit,
  onFilterRadio,
  onMenuOpen,
  filterInput,
  selectOptions
}) => {
  const value = R.prop('value', filterInput)
  const operator = R.prop('operator', filterInput)
  // 'black' for undefined/null/emtpy str
  const fillColor = (R.isEmpty(value) || R.isNil(value)) ? 'black': 'lightgreen'
  return (
    <React.Fragment>
      <Tooltip
        theme='light'
        interactive='true'
        position='bottom'
        trigger='click'
        html={(
          FilterPopover({
            schema,
            modelName,
            fieldName,
            value,
            operator,
            onFilterChange,
            onFilterSubmit,
            onFilterRadio,
            selectOptions,
            onMenuOpen
          })
        )}
      >
        <ReactSVG
          src={`/static/img/filter.svg`}
          className='header-icon'
          svgStyle={{width: '12px', height: '12px', fill: fillColor}}
        />
      </Tooltip>
    </React.Fragment>
  )
}
