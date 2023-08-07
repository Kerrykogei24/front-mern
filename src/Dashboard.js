import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AuthService from './AuthService';
import './dash.css'

const Dashboard = () => {
  const [resources, setResources] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
  });
  const [editingResource, setEditingResource] = useState(null);

  useEffect(() => {
    fetchResources();
  }, []);

  const fetchResources = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/crud/resources', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setResources(response.data);
    } catch (error) {
      console.error('Error fetching resources:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/api/crud/resources', formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setFormData({ name: '', description: '' });
      fetchResources();
    } catch (error) {
      console.error('Error creating resource:', error);
    }
  };

  const handleDelete = async (resourceId) => {
    try {
      await axios.delete(`http://localhost:3000/api/crud/resources/${resourceId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      fetchResources();
    } catch (error) {
      console.error('Error deleting resource:', error);
    }
  };

  const handleEdit = (resource) => {
    setEditingResource(resource);
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditingResource((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleUpdate = async (e, resourceId) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:3000/api/crud/resources/${resourceId}`,
        editingResource,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      setEditingResource(null);
      fetchResources();
    } catch (error) {
      console.error('Error updating resource:', error);
    }
  };

  const handleLogout = () => {
    AuthService.logout();
    window.location.href = '/login';
  };

  return (
    <div className="dashboard-container">
      <button className="btn btn-primary logout-btn" onClick={handleLogout}>
        Logout
      </button>
      <h1 className="my-4">Welcome to Your Dashboard</h1>

      <form onSubmit={handleSubmit} className="resource-form">
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Resource Name"
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Resource Description"
          />
        </div>
        <button type="submit" className="btn btn-success">
          Create Resource
        </button>
      </form>

      <div className="resource-list">
        {resources.map((resource) => (
          <div key={resource._id} className="card mb-3">
            <div className="card-body">
              <h3 className="card-title">{resource.name}</h3>
              <p className="card-text">{resource.description}</p>
              <div className="btn-group">
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(resource._id)}
                >
                  Delete
                </button>
                <button
                  className="btn btn-warning"
                  onClick={() => handleEdit(resource)}
                >
                  Edit
                </button>
              </div>
              {editingResource && editingResource._id === resource._id && (
                <form onSubmit={(e) => handleUpdate(e, editingResource._id)}>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    value={editingResource.name}
                    onChange={handleEditInputChange}
                  />
                  <input
                    type="text"
                    className="form-control"
                    name="description"
                    value={editingResource.description}
                    onChange={handleEditInputChange}
                  />
                  <button type="submit" className="btn btn-primary mt-2">
                    Update
                  </button>
                </form>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
