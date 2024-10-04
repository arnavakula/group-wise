import { useState } from 'react';
import axios from 'axios';

const StudyGroupForm = () => {
    const [formData, setFormData] = useState({
        groupName: '',
        description: '',
        subject: '',
        timePreference: '',
    });


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await axios.post(
            `${import.meta.env.VITE_BACKEND_URL}/study-group/create`, 
            formData, 
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                },
                withCredentials: true 
            }
        );

        setFormData({
            groupName: '',
            description: '',
            subject: '',
            timePreference: '',
        });

        console.log(response);
    };

    return (
        <div className='flex items-center justify-center mt-4'>
            <div className='bg-white p-6 rounded shadow-md w-96'>
                <h2 className='text-lg font-semibold '>Create Study Group</h2>
                <form onSubmit={handleSubmit}>
                    <div className='mb-4'>
                        <label htmlFor='groupName' className='block text-sm font-medium text-gray-700'>Group Name</label>
                        <input
                            type='text'
                            id='groupName'
                            name='groupName'
                            value={formData.groupName}
                            onChange={handleChange}
                            required
                            className='mt-1 block w-full border border-gray-300 rounded-md p-2'
                        />
                    </div>
                    <div className='mb-4'>
                        <label htmlFor='description' className='block text-sm font-medium text-gray-700'>Description</label>
                        <textarea
                            id='description'
                            name='description'
                            value={formData.description}
                            onChange={handleChange}
                            required
                            className='mt-1 block w-full border border-gray-300 rounded-md p-2'
                        />
                    </div>
                    <div className='mb-4'>
                        <label htmlFor='subject' className='block text-sm font-medium text-gray-700'>Subject</label>
                        <input
                            type='text'
                            id='subject'
                            name='subject'
                            value={formData.subject}
                            onChange={handleChange}
                            required
                            className='mt-1 block w-full border border-gray-300 rounded-md p-2'
                        />
                    </div>
                    <div className='mb-4'>
                        <label htmlFor='timePreference' className='block text-sm font-medium text-gray-700'>Time Preference</label>
                        <select
                            id='timePreference'
                            name='timePreference'
                            value={formData.timePreference}
                            onChange={handleChange}
                            required
                            className='mt-1 block w-full border border-gray-300 rounded-md p-2'
                        >
                            <option value=''>Select time preference</option>
                            <option value='Morning'>Morning</option>
                            <option value='Afternoon'>Afternoon</option>
                            <option value='Evening'>Evening</option>
                            <option value='Night'>Night</option>
                        </select>
                    </div>
                    <button
                        type='submit'
                        className='w-full bg-blue-500 text-white rounded-md p-2 hover:bg-blue-600 transition duration-200'
                    >
                        Create Study Group
                    </button>
                </form>
            </div>
        </div>
    );
};

export default StudyGroupForm;
