import Bears from '../images/bears.jpg'

const Navbar = () => {
  return (
    <div className='col-12'>
      <header className='row d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom'>
        <div className='col-sm-5 col-md-4 mb-2 mb-md-0 ps-3 pe-4'>
          <a
            href='/'
            className='d-inline-flex link-body-emphasis text-decoration-none'
          >
            <img
              className='truckLogo'
              alt='Mama bear and her cubs walking'
              src={Bears}
              width='202'
              height='50'
            />
          </a>
        </div>
        <a className='col-sm-3 col-md-4 navbar-brand' href='/'>
          <h3>Code Warrior</h3>
        </a>

        <div className='col-sm-4 col-md-3 text-end'>
          <ul className='nav navbar-nav row'>
            <li className='col-1210'>
              <a
                className='link-underline-light link-opacity-50-hover'
                href='/articles'
              >
                Articles
              </a>
            </li>
          </ul>
        </div>
      </header>
    </div>
  )
}

export default Navbar
