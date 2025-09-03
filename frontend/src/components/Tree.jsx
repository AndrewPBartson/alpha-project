import '../css/tree.css'

const TreeNode = ({ data }) => {
  const hasOutline = data.outline && data.outline.length > 0
  const isEvenLevel = data.level % 2 === 0

  if (!hasOutline) {
    return (
      <li key={data.id} className={isEvenLevel ? 'even' : 'odd'}>
        <div className='li_wrap'>{data.text}</div>
      </li>
    )
  } else {
    return (
      <li key={data.id} className={isEvenLevel ? 'even' : 'odd'}>
        <details open={hasOutline && (data.level < 1 || data.level >= 2)}>
          <summary>{data.text}</summary>
          {hasOutline && <Tree key={data.id} data={data.outline} />}
        </details>
      </li>
    )
  }
}

const Tree = ({ data }) => {
  return (
    <ul className='tree' key={data.id}>
      {data.map((node) => {
        return <TreeNode key={node.id} data={node} />
      })}
    </ul>
  )
}

export default Tree
