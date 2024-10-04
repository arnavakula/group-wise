import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const loginResponse = await axios.post(
            `${import.meta.env.VITE_BACKEND_URL}/user/login`, 
            { email: formData.email, password: formData.password },
            { 
                withCredentials: true 
            }
        );

        localStorage.setItem('token', loginResponse.data.token);
        console.log(localStorage.getItem('token'));
        navigate('/dashboard');
    };

    return (
        <div className='flex items-center justify-center min-h-screen bg-gray-100'>
            <div className='bg-white shadow-md rounded-lg p-8 w-96'>
                <h2 className='text-2xl font-semibold mb-6 text-center'>Log In</h2>
                <form onSubmit={handleSubmit}>
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
                    <button
                        type='submit'
                        className='w-full bg-green-500 text-white font-bold py-2 rounded-md hover:bg-green-600 transition duration-200'
                    >
                        Log In
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
