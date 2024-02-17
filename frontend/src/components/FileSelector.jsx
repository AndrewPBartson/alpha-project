import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchTreeData } from '../features/tree-data/treeDataSlice'
import { fetchFileData } from '../features/file-data/fileDataSlice'

const FileSelector = ({ data, title, btn_text }) => {
  const dispatch = useDispatch()
  const { fileData, status, error } = useSelector((state) => state.fileData)

  // useEffect(() => {
  //   dispatch(fetchFileData())
  // }, [dispatch])

  const onLoadJson = () => {
    dispatch(fetchTreeData())
  }

  return (
    <div className='card m-auto radio-list bg-light'>
      <form className='card-body'>
        <h5 className='card-title'>{title}</h5>
        <ul className='card-text text-start list-unstyled'>
          {/* {fileData.map((item) => {
            return (
              <li className='form-check'>
                <input
                  className='form-check-input'
                  type='radio'
                  name='selectJson'
                  id={item}
                />
                <label className='form-check-label' htmlFor={item}>
                  {item}
                </label>
              </li>
            )
          })} */}
          <li className='form-check'>
            <input
              className='form-check-input'
              type='radio'
              name='selectJson'
              id='jsonFile1'
            />
            <label className='form-check-label' htmlFor='jsonFile1'>
              array_methods.json
            </label>
          </li>
          <li className='form-check'>
            <input
              className='form-check-input'
              type='radio'
              name='selectJson'
              id='jsonFile2'
              checked
            />
            <label className='form-check-label' htmlFor='jsonFile2'>
              indistractable.json
            </label>
          </li>
          <li>Lorem ipsum</li>
          <li>dolor sit amet,</li>
          <li>consectetur adipisicing</li>
          <li>elit. Illo, quas.</li>
        </ul>
        <div className='col-12'>
          <button
            onClick={onLoadJson}
            type='button'
            className='btn btn-outline-primary'
          >
            {btn_text}
          </button>
        </div>
      </form>
    </div>
  )
}
export default FileSelector
