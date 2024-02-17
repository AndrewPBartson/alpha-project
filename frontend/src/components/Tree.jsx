import './tree.css'

const TreeNode = ({ data }) => {
  const hasOutline = data.outline && data.outline.length > 0

  if (!hasOutline) {
    return (
      <li key={data.id}>
        <div className='li_wrap'>{data.text}</div>
      </li>
    )
  } else {
    return (
      <li>
        <details open={hasOutline}>
          <summary>{data.text}</summary>
          {hasOutline && <Tree data={data.outline} />}
        </details>
      </li>
    )
  }
}

const Tree = ({ data }) => {
  return (
    <ul className='tree ps-0'>
      {data.map((node) => {
        return <TreeNode key={node.id} data={node} />
      })}
    </ul>
  )
}

export default Tree
