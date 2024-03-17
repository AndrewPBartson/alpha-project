import Bears from '../images/bears.jpg'
import Button from './Button'
import { useSelector, useDispatch } from 'react-redux'
import { setTheme } from '../features/theme/themeSlice'

const Navbar = () => {
  const dispatch = useDispatch()
  const { theme } = useSelector((state) => state.theme)

  const onChangeMode = () => {
    console.log('onChangeMode:', theme)
    dispatch(setTheme())
  }

  return (
    <nav
      id='nav_bar'
      data-bs-theme={theme}
      className='navbar navbar-expand-md bg-body-tertiary'
    >
      <div className='container-fluid'>
        <a className='navbar-brand' href='#'>
          <img
            className='family of bears'
            alt='Mama bear and her cubs walking'
            src={Bears}
            width='202'
            height='50'
          />
        </a>
        <div className='pb-1'>
          <a className='navbar-brand' href='#'>
            Code Warrior
          </a>
        </div>
        <button
          className='navbar-toggler'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#navbarSupportedContent'
          aria-controls='navbarSupportedContent'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </button>
        <div className='collapse navbar-collapse' id='navbarSupportedContent'>
          <ul className='navbar-nav me-auto mb-lg-0'>
            <li className='nav-item' onClick={onChangeMode}>
              <a className='nav-link' href='#'>
                <Button title='Change Mode' />
              </a>
            </li>
            <li className='nav-item'>
              <a className='nav-link' href='#'>
                <Button title='Test' />
              </a>
            </li>
            {/* <li className='nav-item'>
              <a className='nav-link' href='#'>
                <Button title='Test' />
              </a>
            </li> */}
          </ul>
          <form className='d-flex' role='search'>
            <button className='btn btn-outline-success' type='submit'>
              Login
            </button>
          </form>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
