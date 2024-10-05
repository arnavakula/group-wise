import { Link, Outlet, useLocation } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddIcon from '@mui/icons-material/Add';
import Person2Icon from '@mui/icons-material/Person2';
import ExploreIcon from '@mui/icons-material/Explore';

import DashboardImage from '../assets/images/dashboard-image.png';
import { useState, useEffect } from 'react';
import axios from 'axios';
import '../assets/styles/Dashboard.css';

const Dashboard = () => {
    const location = useLocation();

    return (
        <div className='flex flex-col items-center'>
        <div className='container'>
            <div className='nav'>
                <Link to='/' className='nav-back'><ArrowBackIcon /></Link>
            </div>
            <div className='dashboard-image-container'>
                <img className='dashboard-image' src={DashboardImage} alt="Dashboard" />
            </div>
            <div className='links-container'>
                <Link to='/dashboard/' className={`link-item ${location.pathname === '/dashboard/' ? 'active' : ''}`}>
                    <ExploreIcon />
                    <h3>Explore</h3>
                </Link>
                <Link to='/dashboard/profile' className={`link-item ${location.pathname === '/dashboard/profile' ? 'active' : ''}`}>
                    <Person2Icon />
                    <h3>Your Groups</h3>
                </Link>
                <Link to='/dashboard/create' className={`link-item ${location.pathname === '/dashboard/create' ? 'active' : ''}`}>
                    <AddIcon />
                    <h3>Create</h3>
                </Link>
            </div>
            <Outlet />
        </div>
        </div>
    )
}

export default Dashboard;
