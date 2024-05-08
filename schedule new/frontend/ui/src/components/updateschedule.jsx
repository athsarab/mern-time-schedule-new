// UpdateScheduleForm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateScheduleForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [scheduleItem, setScheduleItem] = useState({
    startLocation: '',
    endLocation: '',
    dtime: '',
    atime: '',
    number: '',
    profile: ''
  });

  useEffect(() => {
    axios.get(`http://localhost:3000/api/schedule/${id}`)
      .then(response => {
        setScheduleItem(response.data);
      })
      .catch(error => {
        console.error('Error fetching schedule item:', error);
      });
  }, [id]);

  const handleChange = e => {
    const { name, value } = e.target;
    setScheduleItem({ ...scheduleItem, [name]: value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    axios.put(`http://localhost:3000/api/schedule/${id}`, scheduleItem)
      .then(() => {
        console.log('Schedule item updated successfully');
        navigate('/list');
      })
      .catch(error => {
        console.error('Error updating schedule item:', error);
      });
  };

  return (
    <div>
      <h2>Update Schedule Item</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="startLocation">Starting Location:</label>
        <input type="text" id="startLocation" name="startLocation" value={scheduleItem.startLocation} onChange={handleChange} />

        <label htmlFor="endLocation">End Location:</label>
        <input type="text" id="endLocation" name="endLocation" value={scheduleItem.endLocation} onChange={handleChange} />

        <label htmlFor="dtime">Departure Time:</label>
        <input type="text" id="dtime" name="dtime" value={scheduleItem.dtime} onChange={handleChange} />

        <label htmlFor="atime">Arrival Time:</label>
        <input type="text" id="atime" name="atime" value={scheduleItem.atime} onChange={handleChange} />

        <label htmlFor="number">Bus Number:</label>
        <input type="text" id="number" name="number" value={scheduleItem.number} onChange={handleChange} />

        <label htmlFor="profile">Profile:</label>
        <input type="text" id="profile" name="profile" value={scheduleItem.profile} onChange={handleChange} />

        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default UpdateScheduleForm;
