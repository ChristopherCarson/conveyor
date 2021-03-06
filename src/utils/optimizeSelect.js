import { components } from 'react-select'
import React from 'react'
import { FixedSizeList as List } from 'react-window'

const OptimizedMenuList = props => {
  const { options, children, maxHeight, getValue } = props
  if (!children || !Array.isArray(children)) return children

  const height = 38
  const [value] = getValue()
  const initialOffset = value
    ? options.indexOf(value) * height
    : 0

  return (
    <List
      width="100%"
      height={Math.min(maxHeight, height * children.length)}
      itemCount={children.length}
      itemSize={height}
      initialScrollOffset={initialOffset}
    >
      {({ index, style }) => (
        <div
          className="select-option-wrapper"
          style={{
            whiteSpace: 'nowrap',
            ...style
          }}
        >
          {children[index]}
        </div>
      )}
    </List>
  )
}

const OptimizedOption = props => {
  delete props.innerProps.onMouseMove
  delete props.innerProps.onMouseOver
  return <components.Option {...props}>{props.children}</components.Option>
}

export const optimizeSelect = {
  components: {
    MenuList: OptimizedMenuList,
    Option: OptimizedOption
  }
}
