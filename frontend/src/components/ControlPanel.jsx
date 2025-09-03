import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { fetchTreeData } from '../features/tree-data/treeDataSlice'
import { fetchFileData } from '../features/file-data/fileDataSlice'
import FileSelector from './FileSelector'

const ControlPanel = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchTreeData())
  }, [dispatch])

  useEffect(() => {
    dispatch(fetchFileData())
  }, [dispatch])

  const onExpand = () => {}
  const onCollapse = () => {}

  return (
    <div className='col-sm-12 col-md-5'>
      <div className='row m-4'>
        <div className='col-12'>
          <button
            onClick={onExpand}
            type='button'
            className='btn btn-outline-primary'
          >
            Collapse All Branches
          </button>
        </div>
      </div>
      <div className='row m-4'>
        <div className='col-12'>
          <button
            onClick={onCollapse}
            type='button'
            className='btn btn-outline-primary'
          >
            Expand All Branches
          </button>
        </div>
      </div>
      <div className='row'>
        <div className='col-12 ps-0'>
          <FileSelector
            title='Select JSON file to load'
            btn_text='Load Selected File'
            data='fileData'
          />
        </div>
      </div>
    </div>
  )
}

export default ControlPanel
