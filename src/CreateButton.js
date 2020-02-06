import React from 'react'
import { Link } from 'react-router-dom'

const CreateButton = ({
  onClick,
  className='btn btn-sm btn-outline-success create-pad'
}) => (
  <Link
    to='/Create'
    onClick={onClick}
    className={className}
    role='button'
    replace
  >Create</Link>
)

export default CreateButton
