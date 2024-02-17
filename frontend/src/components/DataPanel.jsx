import './tree.css'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchTreeData } from '../features/tree-data/treeDataSlice'
import Tree from './Tree'

const DataPanel = () => {
  const dispatch = useDispatch()
  const { treeData, status, error } = useSelector((state) => state.treeData)

  useEffect(() => {
    dispatch(fetchTreeData())
  }, [dispatch])

  // useEffect(() => {
  //   console.log('TreeData has changed:', treeData)
  // }, [treeData])

  if (status === 'loading') {
    return <div>Loading...</div>
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>
  }

  return (
    <div className='col-sm-12 col-md-7'>
      <div className='row'>
        <div className='col-12'>
          <Tree data={treeData} />
        </div>
      </div>
    </div>
  )
}

export default DataPanel
