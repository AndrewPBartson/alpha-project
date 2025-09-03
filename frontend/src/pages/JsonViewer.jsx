import DataPanel from '../components/DataPanel'
import ControlPanel from '../components/ControlPanel'

const JsonViewer = () => {
  return (
    <div>
      <h1>JsonViewer</h1>
      <div className='row'>
        <DataPanel />
        <ControlPanel />
      </div>
    </div>
  )
}
export default JsonViewer
