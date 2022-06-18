import './Spinner.css'

const Spinner = () => {
  return (
    <div className='h-[100vh] flex justify-center'>
      <div className="lds-hourglass"></div>
    </div>
  )
}

export default Spinner
