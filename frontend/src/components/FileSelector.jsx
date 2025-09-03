import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchTreeData } from '../features/tree-data/treeDataSlice'
import { fetchFileData } from '../features/file-data/fileDataSlice'

const FileSelector = ({ data, title, btn_text }) => {
  const dispatch = useDispatch()
  const { fileData } = useSelector((state) => state.fileData)
  const [selectedFile, setSelectedFile] = useState('')

  useEffect(() => {
    dispatch(fetchTreeData())
    dispatch(fetchFileData())
  }, [dispatch])

  const handleRadioChange = (e) => {
    setSelectedFile(e.target.value)
  }

  const handleLoadClick = () => {
    if (!selectedFile) {
      alert('Please select a file first.')
      return
    }

    dispatch(fetchTreeData({ fileName: selectedFile }))
  }

  return (
    <div className='card m-auto radio-list bg-light'>
      <form className='card-body'>
        <h5 className='card-title'>{title}</h5>
        <ul className='card-text text-start list-unstyled'>
          {fileData.map((item, idx) => (
            <li className='form-check' key={`id-${idx}`}>
              <input
                className='form-check-input'
                type='radio'
                name='selectJson'
                id={item}
                value={item}
                checked={selectedFile === item}
                onChange={handleRadioChange}
              />
              <label className='form-check-label' htmlFor={item}>
                {item}
              </label>
            </li>
          ))}
        </ul>
        <div className='col-12'>
          <button
            onClick={handleLoadClick}
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
