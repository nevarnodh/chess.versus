import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProfileComponent = () => {
    const [profile, setProfile] = useState({});
    const [avatar, setAvatar] = useState(null);

    useEffect(() => {
        axios.get('/api/profile')
            .then(response => {
                setProfile(response.data);
            })
            .catch(error => {
                console.error('Error fetching profile:', error);
            });
    }, []);

    const handleFileChange = (e) => {
        setAvatar(e.target.files[0]);
    };

    const handleAvatarUpload = () => {
        const formData = new FormData();
        formData.append('avatar', avatar);

        axios.post('/api/profile/avatar', formData)
            .then(response => {
                alert('Avatar uploaded successfully.');
            })
            .catch(error => {
                console.error('Error uploading avatar:', error);
            });
    };

    return (
        <div>
            <h1>Profile</h1>
            <div>
                <img src={`/uploads/${profile.avatar}`} alt="Avatar" />
                <input type="file" onChange={handleFileChange} />
                <button onClick={handleAvatarUpload}>Upload Avatar</button>
            </div>
            <div>
                <label>Username: </label>
                <input type="text" value={profile.username} />
            </div>
            <div>
                <label>Email: </label>
                <input type="text" value={profile.email} />
            </div>
            <button>Update Profile</button>
        </div>
    );
};

export default ProfileComponent;

