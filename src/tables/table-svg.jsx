import React from 'react'

export const TableSVG = ({table,scaleFactor}) => (
  <rect
    x={table.position.x*scaleFactor}
    y={table.position.y*scaleFactor}
    width={table.length*scaleFactor}
    height={table.width*scaleFactor}
    fill="red"/>
)

export default TableSVG
