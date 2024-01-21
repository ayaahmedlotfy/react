import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Users = () => {
  const [users, setUsers] = useState([]);
  const bearerToken = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/users", {
        headers: {
          Authorization: bearerToken ? `Bearer ${bearerToken}` : "",
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response);
        setUsers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div>
      <h2>Item List</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.email}
            <Link to={`/user/${user.id}`} style={{ textDecoration: "none" }}>
              {" "}
              show
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Users;
