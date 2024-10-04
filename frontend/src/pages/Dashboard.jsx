import { Link, Outlet } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddIcon from '@mui/icons-material/Add';
import Person2Icon from '@mui/icons-material/Person2';
import ExploreIcon from '@mui/icons-material/Explore';

import DashboardImage from '../assets/images/dashboard-image.png';
import { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {

    return (
        <>
        <div className='w-[100vw] py-8'>
            <div className='flex justify-between px-6'>
                <Link to='/' className='items-center'><ArrowBackIcon /></Link>
            </div>
            <div>
                <img src={DashboardImage} />
            </div>
            <div className='my-auto flex justify-center gap-[10%] w-full px-8 '>
                <Link to='/dashboard/' >
                    <div className='flex items-center gap-[1vw]'>
                        <ExploreIcon />
                        <h3>Explore</h3>
                    </div>
                </Link>
               <Link to='/dashboard/profile' >
                    <div className='flex items-center'>
                        <Person2Icon />
                        <h3>Your Groups</h3>
                    </div>
                </Link>
               <Link to='/dashboard/create' >
                    <div className='flex items-center'>
                        <AddIcon />
                        <h3>Create</h3>
                    </div>
                </Link>
            </div>
            <Outlet />
        </div>
        </>
    )
}

export default Dashboard;