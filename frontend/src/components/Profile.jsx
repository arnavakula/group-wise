import { useEffect, useState } from 'react';
import axios from 'axios';

const Profile = () => {
    const [userGroups, setUserGroups] = useState([]);

    useEffect(() => {
        const getUserGroups = async () => {
            const response = await axios.get(
                `${import.meta.env.VITE_BACKEND_URL}/study-group/user`, 
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    },
                    withCredentials: true 
                }
            );

            setUserGroups(response.data.userGroups);
        }

        getUserGroups();
    }, []);

    return (
        <>
        {console.log(userGroups)}
        
        </>
    )
}

export default Profile;