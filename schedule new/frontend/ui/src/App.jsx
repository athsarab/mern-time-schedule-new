import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ScheduleForm from './components/ScheduleForm';

import MyForm from './components/shMyForm';
import ScheduleList from './components/sheduleList';
import UpdateScheduleForm from './components/updateschedule';

const App = () => {
  return (
    <Router>
      
      <Routes>
        
        <Route path="/form" element={<MyForm />} />
        <Route path="/list" element={ <ScheduleList/>} />
        <Route path="/list/id:" element={ <UpdateScheduleForm/>} />
    
      </Routes>
    </Router>
  );
};

export default App;
