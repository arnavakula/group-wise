import { useState, useEffect } from 'react';
import axios from 'axios';

const Explore = () => {
    const [filters, setFilters] = useState({
        timePreference: '',
        subject: ''
    });
    const [studyGroups, setStudyGroups] = useState([]);
    const [subjects, setSubjects] = useState([]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFilters({ ...filters, [name]: value });
    };

    // console.log(studyGroups); 

    useEffect(() => {
        const loadFilters = async () => {
            try {
                const timePreferenceStr = filters.timePreference !== '' ? `timePreference=${filters.timePreference}` : ''
                const subjectStr = filters.subject !== '' ? `subject=${filters.subject}` : ''
                const route = `${import.meta.env.VITE_BACKEND_URL}/study-group?` + [timePreferenceStr, subjectStr].join('&');
                const response = await axios.get(route);

                const retrievedGroups = response.data.studyGroups; 
                setStudyGroups(retrievedGroups)
                console.log(route);
                console.log(retrievedGroups);
            } catch (error) {
                console.error('Error loading filters:', error);
            }
        };

        loadFilters();
    }, [filters]);

    useEffect(() => {
        const fetchSubjects = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/study-group?`);
                const retrievedGroups = response.data.studyGroups; 
                const uniqueSubjects = [...new Set(retrievedGroups.map(group => group.subject))];
                setSubjects(uniqueSubjects);
            } catch (error) {
                console.error('Error fetching subjects:', error);
            }
        };

        fetchSubjects();
    }, []);

    return (
        <>
        <div className="flex gap-[10vw] items-center justify-center mt-4 space-y-4">
            <div className="w-64">
                <label htmlFor="timePreference" className="block text-sm font-medium text-gray-700">Time Preference</label>
                <select
                    id="timePreference"
                    name="timePreference"
                    value={filters.timePreference}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    required
                >
                    <option value="">Select time preference</option>
                    <option value="Morning">Morning</option>
                    <option value="Afternoon">Afternoon</option>
                    <option value="Evening">Evening</option>
                    <option value="Night">Night</option>
                </select>
            </div>

            <div className="w-64">
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700">Subject</label>
                <select
                    id="subject"
                    name="subject"
                    value={filters.subject}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    required
                >
                    <option value="">Select subject</option>
                    {subjects.map((subject) => (
                        <option key={subject} value={subject}>
                            {subject}
                        </option>
                    ))}
                </select>
            </div>
        </div>
        </>
    )
}

export default Explore;