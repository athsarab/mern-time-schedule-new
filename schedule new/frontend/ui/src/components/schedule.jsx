import React, { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import axios from "axios";

const ScheduleItem = ({ scheduleItem, onDelete }) => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState(scheduleItem);

  const handleClose = () => {
    setShowModal(false);
    // Reset form data when closing the modal
    setFormData(scheduleItem);
  };

  const handleShow = () => setShowModal(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleUpdate = () => {
    axios.put(`http://localhost:3000/api/schedule/${scheduleItem._id}`, formData)
      .then(response => {
        console.log(response.data);
        setShowModal(false);
        window.location.reload();
        alert("Schedule item updated successfully!");
      })
      .catch(error => {
        console.error('Error updating schedule item:', error);
      });
  };

  const handleDelete = () => {
    axios.delete(`http://localhost:3000/api/schedule/${scheduleItem._id}`)
      .then(response => {
        console.log(response.data);
        onDelete(scheduleItem._id);
        alert("Schedule item deleted successfully!");
      })
      .catch(error => {
        console.error('Error deleting schedule item:', error);
      });
  };

  return (
    <>
      <tr>
        <td>{scheduleItem.startLocation}</td>
        <td>{scheduleItem.endLocation}</td>
        <td>{scheduleItem.dtime}</td>
        <td>{scheduleItem.atime}</td>
        <td>{scheduleItem.number}</td>
        <td>
        {scheduleItem.profile && <img src={`http://localhost:3000/${scheduleItem.profile}`} alt="Profile" style={{ maxWidth: '100px', maxHeight: '100px' }} />}
      </td>
        <td>
          <Button variant="primary" onClick={handleShow}>Edit</Button>{' '}
          <Button variant="danger" onClick={handleDelete}>Delete</Button>
        </td>
      </tr>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Schedule Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form onSubmit={handleUpdate}>
  <div style={{ marginBottom: '1rem' }}>
    <label htmlFor="startLocation" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Starting Location:</label>
    <select name="startLocation" id="startLocation" value={formData.startLocation} onChange={handleChange} style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}>
      <option value="">Select starting location</option>
      <option value="Matara">Matara</option>
      <option value="Kottawa">Kottawa</option>
      <option value="Maharagama">Maharagama</option>
      <option value="Fort">Fort</option>
    </select>
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
  </div>

  <div style={{ marginBottom: '1rem' }}>
    <label htmlFor="dtime" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Departure Time:</label>
    <input type="time" id="dtime" name="dtime" value={formData.dtime} onChange={handleChange} style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }} />
  </div>

  <div style={{ marginBottom: '1rem' }}>
    <label htmlFor="atime" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Arrival Time:</label>
    <input type="time" id="atime" name="atime" value={formData.atime} onChange={handleChange} style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }} />
  </div>

  <div style={{ marginBottom: '1rem' }}>
    <label htmlFor="number" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Bus number</label>
    <select name="number" id="number" value={formData.number} onChange={handleChange} style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}>
      <option value="">Select bus number</option>
      <option value="ND-4456">ND-4456</option>
      <option value="2NB-1234">NB-1234</option>
      <option value="NB-7164">NB-7164</option>
      <option value="NA-2296">NA-2296</option>
    </select>
  </div>

  <div style={{ marginBottom: '1rem' }}>
    <label htmlFor="profile" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Profile Picture:</label>
    <input type="file" id="profile" name="profile" onChange={handleChange} style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }} />
  </div>


</Form>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Cancel</Button>
          <Button variant="primary" onClick={handleUpdate}>Update</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ScheduleItem;
