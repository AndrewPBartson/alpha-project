import React, { useState } from 'react'
import '../css/accordion.css'

const TreeAccordion = ({ data, level = 0 }) => {
  return (
    <div className='tree-accordion' style={{ paddingLeft: `${level * 20}px` }}>
      {data.map((node) => (
        <AccordionNode key={node.id} node={node} level={level} />
      ))}
    </div>
  )
}

const AccordionNode = ({ node, level }) => {
  const [isOpen, setIsOpen] = useState(false)
  const hasChildren = node.outline && node.outline.length > 0

  const toggle = () => setIsOpen((prev) => !prev)

  return (
    <div className='accordion-node'>
      {hasChildren ? (
        <div className='accordion-item'>
          <div className='accordion-title' onClick={toggle}>
            {isOpen ? '▾ ' : '▸ '}
            {node.text}
          </div>
          {isOpen && <TreeAccordion data={node.outline} level={level + 1} />}
        </div>
      ) : (
        <p className='accordion-text'>{node.text}</p>
      )}
    </div>
  )
}

export default TreeAccordion
