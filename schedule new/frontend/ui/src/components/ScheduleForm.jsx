// ScheduleForm.js
import React, { useState } from 'react';
import axios from 'axios';

const ScheduleForm = () => {
  const [formData, setFormData] = useState({
    startLocation: '',
    endLocation: '',
    dtime: '',
    atime: '',
    number: '',
    profile: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:3000/api/schedule", formData)
      .then(() => {
        setFormData({
          startLocation: '',
          endLocation: '',
          dtime: '',
          atime: '',
          number: '',
          profile: ''
        });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="form-container">
      <h2>Schedule Form</h2>
      <form onSubmit={handleSubmit}>
        {/* Add your form inputs here */}
        <div>
          <label htmlFor="startLocation">Start Location:</label>
          <input type="text" id="startLocation" name="startLocation" value={formData.startLocation} onChange={handleChange} required />
        </div>
        {/* More form inputs */}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ScheduleForm;
