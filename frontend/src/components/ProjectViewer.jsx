import { useSelector, useDispatch } from 'react-redux'
import {
  setCurrentProject,
  setViewingProject,
} from '../features/projects/projectsSlice'

const ProjectViewer = () => {
  const dispatch = useDispatch()
  const { viewingProjectId, projects } = useSelector((state) => state.projects)
  const project = projects.find((p) => p.id === viewingProjectId)

  if (!project)
    return <div className='project-details'>No project selected.</div>

  const handleCloseProject = () => {
    dispatch(setViewingProject(null))
  }

  const isValidRaindropUrl = (url) => {
    if (!url) return false

    const raindropRegex = /^https?:\/\/(www\.)?raindrop\.io\/.+/i
    return raindropRegex.test(url.trim())
  }

  return (
    <div className='project-details'>
      <button onClick={() => handleCloseProject()}>
        Return to List of Projects
      </button>
      <h2>{project.project_name}</h2>

      {/* Optional Image Placeholder */}
      <div className='project-image-placeholder'>
        {/* later add project.image_url and use <img src={...}/> here */}
        <em>[ Project Image Placeholder ]</em>
      </div>

      <p>
        <strong>Description:</strong> {project.description}
      </p>
      <p>
        <strong>Main Category:</strong> {project.main_category}
      </p>
      <p>
        <strong>Other Categories:</strong>{' '}
        {project.other_categories?.join(', ')}
      </p>
      <p>
        <strong>Status:</strong> {project.status}
      </p>
      <p>
        <strong>Priority:</strong> {project.priority}
      </p>
      <p>
        <strong>Raindrop URL:</strong>{' '}
        <a href={project.raindrop_url} target='_blank' rel='noreferrer'>
          {project.raindrop_url}
        </a>
      </p>
      {project.readme_url && (
        <p>
          <strong>Readme:</strong>{' '}
          <a href={project.readme_url} target='_blank' rel='noreferrer'>
            {project.readme_url}
          </a>
        </p>
      )}
      {project.github_url && (
        <p>
          <strong>GitHub:</strong>{' '}
          <a href={project.github_url} target='_blank' rel='noreferrer'>
            {project.github_url}
          </a>
        </p>
      )}
      {project.github_pages_url && (
        <p>
          <strong>GitHub Pages:</strong>{' '}
          <a href={project.github_pages_url} target='_blank' rel='noreferrer'>
            {project.github_pages_url}
          </a>
        </p>
      )}
      {project.deployment_url && (
        <p>
          <strong>Deployment:</strong>{' '}
          <a href={project.deployment_url} target='_blank' rel='noreferrer'>
            {project.deployment_url}
          </a>
        </p>
      )}

      <div>
        <h4>Notes</h4>
        <ul>
          {project.notes?.map((note, i) => (
            <li key={i}>{note}</li>
          ))}
        </ul>
      </div>

      <div>
        <h4>Next Steps</h4>
        <ul>
          {project.next_steps?.map((step, i) => (
            <li key={i}>{step}</li>
          ))}
        </ul>
      </div>

      <p>
        <strong>Last Modified:</strong>{' '}
        {new Date(project.last_modified).toLocaleString()}
      </p>

      <div>
        {isValidRaindropUrl(project.raindrop_url) ? (
          <iframe
            title={`${project.project_name} Raindrop Viewer`}
            style={{ border: 0, width: '100%', height: '450px' }}
            allowFullScreen
            frameBorder='0'
            src={project.raindrop_url}
          />
        ) : (
          <div className='no_results_box'>
            <p>No Raindrop links found</p>
            <img src='/no_results.jpg' alt='No Raindrop Links' />
          </div>
        )}
      </div>
    </div>
  )
}

export default ProjectViewer
