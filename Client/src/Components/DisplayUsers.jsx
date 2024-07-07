import React, { useState, useContext, useEffect } from "react";
import Cookies from 'js-cookie';
import { userContext } from "../App.jsx";

const DisplayUsers = () => {
  const [isManager, setIsManager] = useState(false);
  const { currentUser } = useContext(userContext);
  const [users, setUsers] = useState([]); // State to store user data

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('currentUser')); // Ensure JSON parsing
    const isAdmin = storedUser && storedUser === "Admin"; // Compare type property
    setIsManager(isAdmin);
  }, [currentUser]);

  async function getAllUsers() {
    try {
      const token = Cookies.get('token');
      if (!token) {
        throw new Error('No token found');
      }

      const response = await fetch(`http://localhost:3000/users`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const result = await response.json();
        setUsers(result); 
      } else {
        throw new Error("Failed to fetch users");
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  }

  return (
    <div>
        {!isManager && <div>You don't have permission to access this information</div>}
        {isManager && 
            <div>
                <button onClick={getAllUsers}>Display All Users</button>
                <div> 
                    <ul>
                        {users.map((user, index) => (
                        <li key={index}>{user.username}</li>
                        ))}
                    </ul>
                </div>
            </div>
    }

    </div>
  );
};

export default DisplayUsers;
