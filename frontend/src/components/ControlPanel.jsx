import './controlPanel.css'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchTreeData } from '../features/tree-data/treeDataSlice'
import { fetchFileData } from '../features/file-data/fileDataSlice'
import FileSelector from './FileSelector'

const ControlPanel = () => {
  const dispatch = useDispatch()
  // const { treeData, status, error } = useSelector((state) => state.treeData)
  const { fileData, status, error } = useSelector((state) => state.fileData)

  useEffect(() => {
    dispatch(fetchTreeData())
  }, [dispatch])

  useEffect(() => {
    dispatch(fetchFileData())
  }, [dispatch])

  const onConvertOpml = () => {}
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
            btn_text='Load JSON into Sidebar'
            data='fileData'
          />
        </div>
      </div>
      <div className='row pt-3'>
        <div className='col-12 ps-0'>
          <FileSelector
            title='Select OPML file to convert'
            btn_text='Convert OPML to JSON'
            data='fileData'
          />
        </div>
      </div>
      {/* <div className='row'>
        <div className='col-12 ps-0'>
          <div className='card m-auto radio-list'>
            <div className='card-body'>
              <h5 className='card-title'>Select OPML file to convert</h5>
              <ul className='card-text text-start list-unstyled'>
                <li className='form-check'>
                  <input
                    className='form-check-input'
                    type='radio'
                    name='opmlFiles'
                    id='opmlFile1'
                    checked
                  />
                  <label className='form-check-label' htmlFor='opmlFile1'>
                    array_methods.opml
                  </label>
                </li>
                <li className='form-check'>
                  <input
                    className='form-check-input'
                    type='radio'
                    name='opmlFiles'
                    id='opmlFile2'
                  />
                  <label className='form-check-label' htmlFor='opmlFile2'>
                    indistractable.opml
                  </label>
                </li>
                <li>Lorem ipsum</li>
                <li>dolor sit amet,</li>
                <li>consectetur adipisicing</li>
                <li>elit. Illo, quas.</li>
              </ul>
              <div className='col-12'>
                <button
                  onClick={onConvertOpml}
                  type='button'
                  className='btn btn-outline-primary'
                >
                  Convert OPML to JSON
                </button>
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  )
}

export default ControlPanel
