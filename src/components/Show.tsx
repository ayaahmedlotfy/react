import React from 'react';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import axios from 'axios';
const Show =  () => {
    const [data, setData] = useState([]);
 
    const { id } = useParams();
    // Fetch user details or use the data passed from the previous component
    // ...
     const bearerToken = localStorage.getItem('token');

    useEffect(() => {
        // Fetch data from the API
        axios.get(`http://localhost:8000/api/users/${id}`, {
            headers: {
              'Authorization': bearerToken?`Bearer ${bearerToken}`:"",
              'Content-Type': 'application/json',

            },
          })
          .then(response => {
            console.log(response);
            setData(response.data);
          })
          .catch(error => {
            console.error('Error fetching data:', error);
          });


      
      }, []);
    
    return (
      <div>
        <h2>User Details</h2>
        {/* Display user details here */}
        <p>User ID: {id}</p>
        <p>name:{data.name}</p>
        <p>email:{data.email}</p>
        {/* Other user details */}
      </div>
    );
  };

export default Show