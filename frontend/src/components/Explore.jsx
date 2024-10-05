import { useState, useEffect } from 'react';
import axios from 'axios';
import '../assets/styles/Explore.css';

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

    const handleLeave = async (studyGroupId) => {
        console.log(localStorage.getItem('token'));
        
        const response = await axios.post(
            `${import.meta.env.VITE_BACKEND_URL}/study-group/leave/${studyGroupId}`, 
            {},
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                },
                withCredentials: true 
            }
        );

        setFilters({...filters});
        console.log(response);
    }

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
        <div className="filter-container">
            <div className="filter">
                <label htmlFor="timePreference">Time Preference</label>
                <select
                    id="timePreference"
                    name="timePreference"
                    value={filters.timePreference}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select time preference</option>
                    <option value="Morning">Morning</option>
                    <option value="Afternoon">Afternoon</option>
                    <option value="Evening">Evening</option>
                    <option value="Night">Night</option>
                </select>
            </div>

            <div className="filter">
                <label htmlFor="subject">Subject</label>
                <select
                    id="subject"
                    name="subject"
                    value={filters.subject}
                    onChange={handleChange}
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

        <div className="study-groups-grid">
            {studyGroups.map((group, i) => (
                <div key={i} className="study-group">
                    <h3>{group.groupName}</h3>
                    <p>Time Preference: {group.timePreference}</p>
                    <p>Subject: {group.subject}</p>
                    {group.members.some(member => member.email === localStorage.getItem('email')) ? (
                        <>
                        <button onClick={() => handleLeave(group._id)} className="leave-button">Leave</button>
                        </>
                    ): (
                        <>
                        <button className="join-button">Join</button>
                        </>
                    )}
                </div>
            ))}
        </div>
        </>
    )
}

export default Explore;