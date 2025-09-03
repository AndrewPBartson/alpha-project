import '../css/projects.css'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProjects } from '../features/projects/projectsSlice'
import ProjectsList from '../components/ProjectsList'
import ProjectWorkshop from '../components/ProjectWorkshop'
import ProjectViewer from '../components/ProjectViewer'

const ProjectsContainer = () => {
  const dispatch = useDispatch()
  const { viewingProjectId } = useSelector((state) => state.projects)

  // When component mounts, fetch projects from FS and populate Redux store
  useEffect(() => {
    dispatch(fetchProjects())
  }, [dispatch])

  // const state = useSelector((state) => state)
  // console.log('Entire Redux state:', state)

  return (
    <div className='projects'>
      {viewingProjectId ? (
        <ProjectViewer />
      ) : (
        <div className='d-flex justify-content-around'>
          <ProjectsList />
          <ProjectWorkshop />
        </div>
      )}
    </div>
  )
}

export default ProjectsContainer
