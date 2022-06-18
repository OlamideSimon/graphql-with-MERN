import logo from './assets/logo.png'

const Header = () => {
  return (
    <div>
        <nav className='mb-4 p-3 bg-slate-100'>
            <div className='container'>
                <a href='/'>
                    <div className='flex items-center space-x-1'>
                        <img src={logo} alt='logo' className='w-7' />
                        <p className='text-pink-500'>ProjectMgmt</p>
                    </div>
                </a>
            </div>
        </nav>
    </div>
  )
}

export default Header