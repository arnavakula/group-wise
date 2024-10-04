import { Link, Outlet } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddIcon from '@mui/icons-material/Add';

import DashboardImage from '../assets/images/dashboard-image.png';

const Dashboard = () => {
    const tabs = ['Explore', 'Profile']

    return (
        <>
        <div className='w-[100vw] py-8'>
            <div className='flex justify-between px-6'>
                <Link to='/' className='items-center'><ArrowBackIcon /></Link>
                <Link to='/dashboard/create' >
                    <div className='flex items-center'>
                        <AddIcon />
                        <h3>Create a study group</h3>
                    </div>
                </Link>
            </div>
            <div>
                <img src={DashboardImage} />
            </div>
            <div className='my-auto flex justify-between w-full '>
               <Link to='/dashboard'><h3>Explore</h3></Link>
               <Link to='/dashboard/profile'><h3>Profile</h3></Link>
            </div>
            <Outlet />
        </div>
        </>
    )
}

export default Dashboard;