import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ScheduleItem from './schedule';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const ScheduleList = () => {
    const [scheduleItems, setScheduleItems] = useState([]);
    const [filteredScheduleItems, setFilteredScheduleItems] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        // Fetch schedule items from API and set them to state
        axios.get('http://localhost:3000/api/schedule')
            .then(response => {
                setScheduleItems(response.data);
                setFilteredScheduleItems(response.data); // Initially set filtered items to all items
            })
            .catch(error => {
                console.error('Error fetching schedule items:', error);
            });
    }, []);

    const handleDeleteItem = id => {
        // Update state to remove the deleted item
        setScheduleItems(scheduleItems.filter(item => item._id !== id));
        setFilteredScheduleItems(filteredScheduleItems.filter(item => item._id !== id));
    };

    const handleSearch = e => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);
        const filtered = scheduleItems.filter(item =>
            item.startLocation.toLowerCase().includes(query) ||
            item.endLocation.toLowerCase().includes(query) ||
            item.dtime.toLowerCase().includes(query) ||
            item.atime.toLowerCase().includes(query) ||
            item.number.toLowerCase().includes(query) ||
            (item.profile && item.profile.toLowerCase().includes(query))
        );
        setFilteredScheduleItems(filtered);
    };

    const handleDownloadReport = () => {
        const doc = new jsPDF();
        doc.text('Bus time Schedule Report', 10, 10);

        const columns = ['Start Location', 'End Location', 'Departure Time', 'Arrival Time', 'Bus Number'];
        const data = filteredScheduleItems.map(item => [
            item.startLocation,
            item.endLocation,
            item.dtime,
            item.atime,
            item.number|| ''
        ]);

        doc.autoTable({
            head: [columns],
            body: data
        });

        doc.save('schedule_report.pdf');
    };

    return (
        <div>
            <h2 style={{ textAlign: 'center' }}>Schedule List</h2>
            <div style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center' }}>
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={handleSearch}
                    style={{ padding: '0.5rem', borderRadius: '4px', border: '1px Hex #FFFF00', flex: '10' }}
                />
                <button onClick={handleDownloadReport} style={{ marginLeft: '1rem', padding: '0.5rem', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                    Download Report
                </button>
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse' }} className="table">
                <thead>
                    <tr>
                        <th style={{ border: '1px solid #ddd', padding: '8px', backgroundColor: '#008000' , color: '#ffffff'}}>Start Location</th>
                        <th style={{ border: '1px solid #ddd', padding: '8px', backgroundColor: '#008000' , color: '#ffffff'}}>End Location</th>
                        <th style={{ border: '1px solid #ddd', padding: '8px', backgroundColor: '#008000' ,color: '#ffffff'}}>Departure Time</th>
                        <th style={{ border: '1px solid #ddd', padding: '8px', backgroundColor: '#008000', color: '#ffffff' }}>Arrival Time</th>
                        <th style={{ border: '1px solid #ddd', padding: '8px', backgroundColor: '#008000' , color: '#ffffff'}}>Bus Number</th>
                        <th style={{ border: '1px solid #ddd', padding: '8px', backgroundColor: '#008000', color: '#ffffff' }}>Profile</th>
                        <th style={{ border: '1px solid #ddd', padding: '8px', backgroundColor: '#008000' , color: '#ffffff'}}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredScheduleItems.map(scheduleItem => (
                        <ScheduleItem
                            key={scheduleItem._id}
                            scheduleItem={scheduleItem}
                            onDelete={handleDeleteItem}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ScheduleList;
