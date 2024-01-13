import logo from '../../../assets/images/logo-videoshack.png'

const Greeting = () => {
    <div className=' h-80 flex flex-row w-full justify-center'>
    <img src={logo} alt="" className='h-40' />
</div>
    return (
        <div className='w-full h-72 flex flex-row'>
        <div className='w-2/5 flex flex-col justify-center items-center pl-20 uppercase'>
        <img src={logo} alt="lvideoShack logo" />
        </div>
        <div className='w-3/5 py-6 text-center text-white pr-14 '>
            <h1 className='text-7xl'>Your no. One</h1>
            <h1 className='text-7xl'>video rental shop</h1>
            <span className='flex gap-4 justify-center'>
            <p className='pt-4'>• VHS Rentals</p>
            <p className='pt-4'>• VCR Rentals </p>
            <p className='pt-4'>• Digital Rentals </p>
            </span>

        </div>
    </div>
    )
  }
  
  export default Greeting