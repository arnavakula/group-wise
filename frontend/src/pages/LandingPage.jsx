import { Link } from 'react-router-dom';
import LandingImage from '../assets/images/landing-image.png';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useState } from 'react';

const LandingPage = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('token') !== null);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
    }

    return (
        <>
            <div className='max-h-[100vh] md:px-10'>
                <nav className='w-full h-[10vh] flex justify-between items-center px-6'>
                    <h3 className='font-lato font-bold text-[1.4rem] lg:text-[2rem]'>GroupWise</h3>
                    <div className='flex gap-[4vw] font-openSans text-[1.1rem] lg:text-[1.4rem]'>
                        {!isLoggedIn ? (
                            <>
                            <Link to='/signup'><h3>Signup</h3></Link>
                            <Link to='/login'><h3>Login</h3></Link>
                            </>
                        ) : (
                            <h3 onClick={handleLogout} className='cursor-pointer'>Logout</h3>
                        )}
                        
                        
                        <Link to='/dashboard'><h3>Dashboard</h3></Link>
                    </div>
                </nav>
                <div className='flex flex-col px-4 gap-[2vh] lg:flex-row lg:justify-between lg:mt-10'>
                    <div className='flex flex-col gap-[2vh]'>
                        <h1 className='font-openSans text-[2rem] w-[80%] lg:text-[4rem]'>The quickest way to group learning success</h1>
                        <p className='font-roboto text-[1.3rem] w-[80%] lg:text-[2rem]'>Find, join, and thrive in study groups effortlessly - from your first session to your best grades.</p>
                    </div>
                    <div className='w-full h-[50vh] lg:w-[40%]'>
                        <img 
                            src={LandingImage} className='object-contain w-full h-full'
                        />
                    </div>
                </div>
                <Link to='/signup'>
                    <div className='ml-4 w-[60%] lg:max-w-[30vw] border border-black h-[8vh] text-left flex items-center px-4 justify-between '>
                        <h3 className='font-lato text-[1.4rem]'>Get started for free</h3>
                        <ChevronRightIcon fontSize='large'/>
                    </div>
                </Link>
            </div>
        </>
    )
}

export default LandingPage;
