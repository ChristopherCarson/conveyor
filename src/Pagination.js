import React from 'react'
import * as R from 'ramda'
import { getActions } from './utils/schemaGetters'

const PaginationLink = ({ modelName, fieldName, onChangePage, text, updatedPageIndex }) => {
  return (
    <li className="page-item">
      <a className="page-link" href="#" onClick={() => onChangePage({
        modelName, fieldName, updatedPageIndex
      })}>
        {text}
      </a>
    </li>
  )
}

export const Pagination = ({ modelName, fieldName = null, idx, lastIndex, onChangePage }) => {
  // get previous & last conditions; 'lastIndex' can be null or '0' value
  const hasFirst = idx > 1
  const hasPrev = idx > 0
  const hasNext = (lastIndex > 0) && (idx < lastIndex)
  const hasLast = (lastIndex > 0) && (idx < (lastIndex-1))

  // number displayed to user
  const displayIndex = idx + 1

  // no pagination
  if (!hasFirst && !hasPrev && !hasNext && !hasLast) {
    return null
  }

  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination">
        {
          hasFirst && <PaginationLink {...{
            modelName, fieldName, onChangePage,
            text: '«',
            updatedPageIndex: (0)
          }} />
        }
        {
          hasPrev && <PaginationLink {...{
            modelName, fieldName, onChangePage,
            text: '‹',
            updatedPageIndex: (idx - 1)
          }} />
        }
        {
          <PaginationLink {...{
            modelName, fieldName, onChangePage,
            text: `${displayIndex}`,
            updatedPageIndex: (idx)
          }} />
        }
        {
          hasNext && <PaginationLink {...{
            modelName, fieldName, onChangePage,
            text: '›',
            updatedPageIndex: (idx + 1)
          }} />
        }
        {
          hasLast && <PaginationLink {...{
            modelName, fieldName, onChangePage,
            text: '»',
            updatedPageIndex: (lastIndex)
          }} />
        }
      </ul>
    </nav>
  )
}

export const IndexPagination = ({ schema, modelName, tableView }) => {
  const actions = getActions(schema, modelName)
  const onChangePage = R.path(['tableOptions', 'changePage'], actions)

  // current page idx
  const idx = R.pathOr(0, ['page', modelName], tableView)

  // get index of last hypothetical data point
  const lastIndex = R.path(['lastIndexPagination', modelName], tableView)

  return <Pagination {...{ modelName, idx, lastIndex, onChangePage }} />
}

export const DetailPagination = ({ schema, modelName, fieldName, tableView }) => {
  const actions = getActions(schema, modelName)
  const onChangePage = R.path(['tableOptions', 'changeRelTablePage'], actions)

  // current page idx
  const idx = R.pathOr(0, ['relTablePage', modelName, fieldName], tableView)

  // get index of last hypothetical data point
  const lastIndex = R.path(['lastIndexRelTablePagination', modelName, fieldName], tableView)

  return <Pagination {...{ modelName, fieldName, idx, lastIndex, onChangePage }} />
}
