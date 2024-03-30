import React, { useEffect, useState } from "react";
import axios from 'axios';
import Layout from "../../components/Layout/Layout";
import AdminMenu from "./../../components/Layout/AdminMenu";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/auth/users`);
        if (data?.error) {
          console.error(data.error);
        } else {
          setUsers(data.users);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Render loading state
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Layout title={"Dashboard - All Users"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>All Users</h1>
            <table className="user-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                </tr>
              </thead>
              <tbody>
                {users && users.map((user) => (
                  <tr key={user._id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.phoneno}</td>
                  </tr>
                ))}
              </tbody>      
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Users;