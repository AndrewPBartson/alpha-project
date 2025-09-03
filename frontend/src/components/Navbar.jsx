import Bears from '../images/bears.jpg'
import Button from './Button'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { openModal, logoutUser } from '../features/auth/authSlice'
import { toast } from 'react-toastify'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faBars,
  faSignOut,
  faTimes,
  faUser,
} from '@fortawesome/free-solid-svg-icons'

const Navbar = () => {
  const dispatch = useDispatch()
  const { theme } = useSelector((state) => state.theme)
  const user = useSelector((state) => state.auth.user)
  const status = useSelector((state) => state.auth.status)

  const [dropdownOpen, setDropdownOpen] = useState(false)

  const handleAccount = () => {
    toast.success('Your account is Free. No problem.')
    setDropdownOpen(false)
  }

  const handleLogout = () => {
    try {
      dispatch(logoutUser()).unwrap()
      toast.success('You are logged out!')
      setDropdownOpen(false)
      // closeMenu() // in case logout is clicked in mobile
    } catch (err) {
      toast.error('Something went wrong during logout')
    }
  }

  const renderAuthButtons = () => {
    // if (status === 'loading') {
    //   return (
    //     <>
    //       <li className='nav__list skeleton-button'></li>
    //       <li className='nav__list skeleton-badge'></li>
    //     </>
    //   )
    // }

    if (!user) {
      return (
        <>
          <li className='nav__list'>
            <button
              className='nav__link auth_btn'
              onClick={() => dispatch(openModal('register'))}
            >
              Register
            </button>
          </li>
          <li className='nav__list'>
            <button
              className='nav__link auth_btn'
              onClick={() => dispatch(openModal('login'))}
            >
              Login
            </button>
          </li>
        </>
      )
    }
    // User is logged in
    const initial = user.email?.charAt(0).toUpperCase()

    return (
      <li className='nav__list user-badge-wrapper'>
        <button
          className='user-badge'
          onClick={() => setDropdownOpen((prev) => !prev)}
        >
          {initial}
        </button>
        {dropdownOpen && (
          <ul className='dropdown-menu'>
            <li className='auth_icon_wrapper' onClick={handleAccount}>
              <FontAwesomeIcon className='auth_icon' icon={faUser} /> Account
            </li>
            <li className='auth_icon_wrapper' onClick={handleLogout}>
              <FontAwesomeIcon className='auth_icon' icon={faSignOut} /> Log Out
            </li>
          </ul>
        )}
      </li>
    )
  }

  return (
    <div className='row'>
      <div className='col-12'>
        <nav
          id='nav_bar'
          data-bs-theme={theme}
          className='navbar navbar-expand-md bg-body-tertiary'
        >
          <div className='container-fluid nav_wrapper'>
            <Link to='/' className='navbar-brand'>
              <img
                className='family of bears'
                alt='Mama bear and her cubs walking'
                src={Bears}
                width='202'
                height='50'
              />
            </Link>
            <div className='pb-1'>
              <Link to='/' className='navbar-brand'>
                Code Warrior
              </Link>
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
            <div
              className='collapse navbar-collapse'
              id='navbarSupportedContent'
            >
              <ul className='navbar-nav me-auto mb-lg-0'>
                <Link to='/' className='me-3'>
                  Projects Manager
                </Link>
                <Link to='/reader'>Json Viewer</Link>
                {/* <li className='nav-item' onClick={onChangeMode}>
              <a className='nav-link' href='#'>
                <Button title='Change Mode' />
              </a>
            </li> */}
                {/* <li className='nav-item'>
              <a className='nav-link' href='#'>
                <Button title='Test' />
              </a>
            </li> */}
                {/* <li className='nav-item'>
              <a className='nav-link' href='#'>
                <Button title='Test' />
              </a>
            </li> */}
              </ul>
              {renderAuthButtons()}
            </div>
          </div>
        </nav>
      </div>
    </div>
  )
}

export default Navbar
