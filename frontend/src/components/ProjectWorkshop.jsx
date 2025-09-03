// Project Workshop with Create/Edit mode and read-only view support

import { useState, useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import {
  saveProject,
  saveProjectUpdate,
  setCurrentProject,
  setMode,
} from '../features/projects/projectsSlice'

const ProjectWorkshop = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.auth.user)
  const { mode, projects, currentProjectId } = useSelector(
    (state) => state.projects
  )

  const emptyForm = useMemo(
    () => ({
      project_name: '',
      description: '',
      main_category: '',
      other_categories: [],
      status: 'Active',
      priority: 1,
      notes: [],
      next_steps: [],
      raindrop_url: '',
      raindrop_url_2: '',
      github_url: '',
      github_pages_url: '',
      deployment_url: '',
      custom_category: '',
    }),
    []
  )

  const [formData, setFormData] = useState(emptyForm)
  const [noteText, setNoteText] = useState('')
  const [stepText, setStepText] = useState('')

  const currentProject = projects.find((p) => p.id === currentProjectId) || null

  useEffect(() => {
    if (mode === 'edit' && currentProject) {
      setFormData({ ...currentProject })
    } else {
      setFormData(emptyForm)
    }
  }, [mode, currentProject, emptyForm])

  const categoryOptions = [
    'Code',
    'Tour',
    'Ashram',
    'IoT',
    'Personal',
    'Writing',
    'Other',
  ]
  const statusOptions = [
    'Active',
    'High priority',
    'Paused',
    'Done',
    'Broken',
    'Abandoned',
  ]

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleMultiSelect = (e) => {
    const selected = Array.from(e.target.selectedOptions).map(
      (opt) => opt.value
    )
    setFormData((prev) => ({ ...prev, other_categories: selected }))
  }

  const handleNoteAdd = () => {
    if (noteText) {
      setFormData((prev) => ({ ...prev, notes: [...prev.notes, noteText] }))
      setNoteText('')
    }
  }

  const handleNoteDelete = (index) => {
    setFormData((prev) => ({
      ...prev,
      notes: prev.notes.filter((_, i) => i !== index),
    }))
  }

  const handleStepAdd = () => {
    if (stepText) {
      setFormData((prev) => ({
        ...prev,
        next_steps: [...prev.next_steps, stepText],
      }))
      setStepText('')
    }
  }

  const handleStepDelete = (index) => {
    setFormData((prev) => ({
      ...prev,
      next_steps: prev.next_steps.filter((_, i) => i !== index),
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const updates = {
      ...formData,
      other_categories: formData.custom_category
        ? [...formData.other_categories, formData.custom_category]
        : formData.other_categories,
      last_modified: new Date().toISOString(),
      // Add user ID if available
      uid: user?.uid || null,
      raindrop_iframe: `<iframe style="border: 0; width: 100%; height: 450px;" allowfullscreen frameborder="0" src="${formData.raindrop_url}"></iframe>`,
    }

    console.log('updates', updates)

    if (mode === 'create') {
      dispatch(saveProject(updates))
    } else if (mode === 'edit') {
      dispatch(saveProjectUpdate({ id: currentProjectId, updates }))
    }

    setFormData(emptyForm)
    setNoteText('')
    setStepText('')
  }

  const handleOpenMindMap = async () => {
    // only works during development. URL is hardcoded to localhost.
    try {
      const res = await fetch('http://localhost:5470/open-mindmap')
      if (!res.ok) throw new Error('Failed to open mindmap')
      toast.success('MindManager file opened successfully!')
    } catch (err) {
      console.error(err)
      toast.error('Error opening MindManager file. File may already be open.')
    }
  }

  return (
    <div>
      <button onClick={handleOpenMindMap}>Open Alpha MindMap</button>
      <form onSubmit={handleSubmit} className='form'>
        {mode === 'create' ? (
          <h2>Create New Project</h2>
        ) : (
          <h2>Update Project</h2>
        )}

        <div>
          <label>
            <input
              type='radio'
              value='create'
              checked={mode === 'create'}
              onChange={() => dispatch(setMode('create'))}
            />
            Create Project
          </label>
          <label>
            <input
              type='radio'
              value='edit'
              checked={mode === 'edit'}
              onChange={() => dispatch(setMode('edit'))}
            />
            Update Project
          </label>
        </div>

        {mode === 'edit' && (
          <div className='input_pair'>
            <label>Select a project to edit:</label>
            <select
              value={currentProjectId || ''}
              onChange={(e) => dispatch(setCurrentProject(e.target.value))}
            >
              <option value=''>-- Select Project --</option>
              {projects.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.project_name || '(Unnamed project)'}
                </option>
              ))}
            </select>
          </div>
        )}

        <div className='input_pair'>
          <label>
            Project Name <span className='redStar'>*</span>
          </label>
          <input
            name='project_name'
            value={formData.project_name}
            onChange={handleChange}
            required
          />
        </div>

        <div className='input_pair'>
          <label>
            Description <span className='redStar'>*</span>
          </label>
          <textarea
            name='description'
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>

        <div className='input_pair'>
          <label>
            Main Category <span className='redStar'>*</span>
          </label>
          <select
            name='main_category'
            value={formData.main_category}
            onChange={handleChange}
            required
          >
            <option value=''>Select a category</option>
            {categoryOptions.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div className='input_pair'>
          <label>Other Categories</label>
          <select
            multiple
            value={formData.other_categories}
            onChange={handleMultiSelect}
          >
            {categoryOptions.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div className='input_pair'>
          <label>Add Custom Category</label>
          <input
            name='custom_category'
            value={formData.custom_category}
            onChange={handleChange}
            placeholder='e.g., eco-design'
          />
        </div>

        <div className='input_pair'>
          <label>
            Status <span className='redStar'>*</span>
          </label>
          <select
            name='status'
            value={formData.status}
            onChange={handleChange}
            required
          >
            {statusOptions.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>

        <div className='input_pair'>
          <label>Priority (1-10)</label>
          <input
            type='number'
            name='priority'
            min='1'
            max='10'
            value={formData.priority}
            onChange={handleChange}
          />
        </div>

        <div className='input_pair'>
          <label>
            Raindrop URL <span className='redStar'>*</span>
          </label>
          <input
            name='raindrop_url'
            value={formData.raindrop_url}
            onChange={handleChange}
            required
          />
        </div>

        <div className='input_pair'>
          <label>Another Raindrop URL</label>
          <input
            name='raindrop_url_2'
            value={formData.raindrop_url_2}
            onChange={handleChange}
          />
        </div>

        <div className='input_pair'>
          <label>GitHub URL</label>
          <input
            name='github_url'
            value={formData.github_url}
            onChange={handleChange}
          />
        </div>
        <div className='input_pair'>
          <label>GitHub Pages URL</label>
          <input
            name='github_pages_url'
            value={formData.github_pages_url}
            onChange={handleChange}
          />
        </div>
        <div className='input_pair'>
          <label>Deployment URL</label>
          <input
            name='deployment_url'
            value={formData.deployment_url}
            onChange={handleChange}
          />
        </div>

        <div className='input_pair'>
          <label>Add Note</label>
          <textarea
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
          />
          <button type='button' onClick={handleNoteAdd}>
            Add Note
          </button>
          <ul>
            {formData.notes.map((note, i) => (
              <li key={i}>
                {note}
                <button onClick={() => handleNoteDelete(i)}>Delete</button>
              </li>
            ))}
          </ul>
        </div>

        <div className='input_pair'>
          <label>Next Step</label>
          <textarea
            value={stepText}
            onChange={(e) => setStepText(e.target.value)}
          />
          <button type='button' onClick={handleStepAdd}>
            Add Step
          </button>
          <ul>
            {formData.next_steps.map((step, i) => (
              <li key={i}>
                {step}
                <button onClick={() => handleStepDelete(i)}>Delete</button>
              </li>
            ))}
          </ul>
        </div>

        <button type='submit'>Save Project</button>
      </form>
    </div>
  )
}

export default ProjectWorkshop
