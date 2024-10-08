import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignupPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        major: '',
        timePreference: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const registerResponse = await axios.post(
            `${import.meta.env.VITE_BACKEND_URL}/user/register`, 
            formData, 
            { 
                withCredentials: true 
            }
        );

        const loginResponse = await axios.post(
            `${import.meta.env.VITE_BACKEND_URL}/user/login`, 
            { email: formData.email, password: formData.password },
            { 
                withCredentials: true 
            }
        );

        localStorage.setItem('email', formData.email);
        localStorage.setItem('token', loginResponse.data.token);   
        navigate('/dashboard');
    };

    return (
        <div className='flex items-center justify-center min-h-screen bg-gray-100'>
            <div className='bg-white shadow-md rounded-lg p-8 w-96'>
                <h2 className='text-2xl font-semibold mb-6 text-center'>Sign Up</h2>
                <form onSubmit={handleSubmit}>
                    <div className='mb-4'>
                        <label htmlFor='username' className='block text-sm font-medium text-gray-700'>Name:</label>
                        <input
                            type='text'
                            id='username'
                            name='username'
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-green-200'
                        />
                    </div>
                    <div className='mb-4'>
                        <label htmlFor='email' className='block text-sm font-medium text-gray-700'>Email:</label>
                        <input
                            type='email'
                            id='email'
                            name='email'
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-green-200'
                        />
                    </div>
                    <div className='mb-4'>
                        <label htmlFor='password' className='block text-sm font-medium text-gray-700'>Password:</label>
                        <input
                            type='password'
                            id='password'
                            name='password'
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-green-200'
                        />
                    </div>
                    <div className='mb-4'>
                        <label htmlFor='major' className='block text-sm font-medium text-gray-700'>Major:</label>
                        <input
                            type='text'
                            id='major'
                            name='major'
                            value={formData.major}
                            onChange={handleChange}
                            required
                            className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-green-200'
                        />
                    </div>
                    <div className='mb-4'>
                        <label htmlFor='timePreference' className='block text-sm font-medium text-gray-700'>Preferred Study Time:</label>
                        <select
                            id='timePreference'
                            name='timePreference'
                            value={formData.timePreference}
                            onChange={handleChange}
                            required
                            className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-green-200'
                        >
                            <option value=''>Select...</option>
                            <option value='Morning'>Morning</option>
                            <option value='Afternoon'>Afternoon</option>
                            <option value='Evening'>Evening</option>
                            <option value='Night'>Night</option>
                        </select>
                    </div>
                    <button
                        type='submit'
                        className='w-full bg-green-500 text-white font-bold py-2 rounded-md hover:bg-green-600 transition duration-200'
                    >
                        Sign Up
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SignupPage;
