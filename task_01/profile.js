import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get('/api/users/profile'); // Assuming session management
        setUser(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUser();
  }, []);

  if (!user) return <div>Loading...</div>;

  return (
    <div>
      <h1>{user.username}'s Profile</h1>
      <img src={user.avatar} alt="avatar" />
      <p>Wins: {user.stats.wins}</p>
      <p>Losses: {user.stats.losses}</p>
      <p>Draws: {user.stats.draws}</p>
      <button>Edit Profile</button>
      <button>View Game History</button>
      <button>Logout</button>
    </div>
  );
}

export default Profile;

