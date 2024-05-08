import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const MyForm = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        startLocation: '',
        endLocation: '',
        dtime: '',
        atime: '',
        number: '',
        profile: '',
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validation
        const errors = {};
        if (!formData.startLocation) {
            errors.startLocation = "Starting location is required";
        }
        if (!formData.endLocation) {
            errors.endLocation = "End location is required";
        }
        if (!formData.dtime) {
            errors.dtime = "Departure time is required";
        }
        if (!formData.atime) {
            errors.atime = "Arrival time is required";
        }
        if (!formData.number) {
            errors.number = "Bus number is required";
        }
        if (!formData.profile) {
            errors.profile = "Profile is required";
        }

        if (Object.keys(errors).length === 0) {
            axios.post("http://localhost:3000/api/schedule", formData)
                .then(() => {
                    alert ("Schedule added successfully");
                    setFormData({
                        startLocation: '',
                        endLocation: '',
                        dtime: '',
                        atime: '',
                        number: '',
                        profile: '',
                    });
                    navigate("/list");
                })
                .catch(error => {
                    console.error("Error adding schedule:", error);
                    // Optionally, you can show an error message to the user
                });
        } else {
            setErrors(errors);
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: 'auto', fontFamily: 'Arial, sans-serif' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '1.5rem', color: '#333' , backgroundColor: '#00008B' ,color: '#ffffff'}}>Bus Schedule Form</h2>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '1rem' }}>
                    <label htmlFor="startLocation" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Starting Location:</label>
                    <select name="startLocation" id="startLocation" value={formData.startLocation} onChange={handleChange} style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}>
                        <option value="">Select starting location</option>
                        <option value="Matara">Matara</option>
                        <option value="Kottawa">Kottawa</option>
                        <option value="Maharagama">Maharagama</option>
                        <option value="Fort">Fort</option>
                    </select>
                    {errors.startLocation && <p style={{ color: 'red', fontSize: '0.8rem', marginTop: '0.5rem' }}>{errors.startLocation}</p>}
                </div>

                <div style={{ marginBottom: '1rem' }}>
                    <label htmlFor="endLocation" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>End Location:</label>
                    <select name="endLocation" id="endLocation" value={formData.endLocation} onChange={handleChange} style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}>
                        <option value="">Select end location</option>
                        <option value="Matara">Matara</option>
                        <option value="Kottawa">Kottawa</option>
                        <option value="Maharagama">Maharagama</option>
                        <option value="Fort">Fort</option>
                    </select>
                    {errors.endLocation && <p style={{ color: 'red', fontSize: '0.8rem', marginTop: '0.5rem' }}>{errors.endLocation}</p>}
                </div>

                <div style={{ marginBottom: '1rem' }}>
                    <label htmlFor="dtime" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Departure Time:</label>
                    <input type="time" id="dtime" name="dtime" value={formData.dtime} onChange={handleChange} style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }} placeholder="Enter departure time" />
                    {errors.dtime && <p style={{ color: 'red', fontSize: '0.8rem', marginTop: '0.5rem' }}>{errors.dtime}</p>}
                </div>

                <div style={{ marginBottom: '1rem' }}>
                    <label htmlFor="atime" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Arrival Time:</label>
                    <input type="time" id="atime" name="atime" value={formData.atime} onChange={handleChange} style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }} placeholder="Enter arrival time" />
                    {errors.atime && <p style={{ color: 'red', fontSize: '0.8rem', marginTop: '0.5rem' }}>{errors.atime}</p>}
                </div>

                <div style={{ marginBottom: '1rem' }}>
                    <label htmlFor="number" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Bus number</label>
                    <select name="number" id="number" value={formData.number} onChange={handleChange} style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}>
                        <option value="">Select bus number</option>
                        <option value="ND-4456">ND-4456</option>
                        <option value="NB-1234">NB-1234</option>
                        <option value="NB-7164">NB-7164</option>
                        <option value="NA-2296">NA-2296</option>
                    </select>
                    {errors.number && <p style={{ color: 'red', fontSize: '0.8rem', marginTop: '0.5rem' }}>{errors.number}</p>}
                </div>

                <div style={{ marginBottom: '1rem' }}>
                    <label htmlFor="profile" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Profile Picture:</label>
                    <input type="file" id="profile" name="profile" onChange={handleChange} style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }} />
                    {errors.profile && <p style={{ color: 'red', fontSize: '0.8rem', marginTop: '0.5rem' }}>{errors.profile}</p>}
                </div>

                <input type="submit" value="Submit" style={{ backgroundColor: '#4CAF50', color: 'white', padding: '0.7rem 1rem', border: 'none', borderRadius: '4px', cursor: 'pointer' }} />
            </form>
        </div>
    );
};

export default MyForm;
