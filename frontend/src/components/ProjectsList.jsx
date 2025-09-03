import { useSelector, useDispatch } from 'react-redux'
import {
  setCurrentProject,
  setViewingProject,
  setMode,
  removeProject,
} from '../features/projects/projectsSlice'

const ProjectsList = () => {
  const projects = useSelector((state) => state.projects.projects)
  const dispatch = useDispatch()

  const handleViewProject = (id) => {
    dispatch(setViewingProject(id))
  }

  const handleEditProject = (id) => {
    dispatch(setMode('edit'))
    dispatch(setCurrentProject(id))
  }

  const handleDeleteProject = (id, name) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete "${name}"?`
    )
    if (confirmDelete) {
      dispatch(removeProject(id))
    }
  }

  return (
    <div className='projects-list'>
      <h3>Projects</h3>
      <ul>
        {projects.map((project) => (
          <li key={project.id}>
            <strong>{project.project_name}</strong>
            <br />
            <button onClick={() => handleViewProject(project.id)}>View</button>
            <button onClick={() => handleEditProject(project.id)}>Edit</button>
            <button
              onClick={() => {
                handleDeleteProject(project.id, project.project_name)
              }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ProjectsList
