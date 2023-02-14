import React, { useState } from 'react';
import Pomo from './features/pomo/Pomo';
import Header from './features/header/Header';
import './App.css';
import TaskList from './features/tasks/TaskList';
import BtnAddTask from './features/tasks/BtnAddTask';
import FormAddTask from './features/tasks/FormAddTask';

const App:React.FC = () => {

  const [showFormHideBtn,setShowForm] = useState<boolean>(false)

  const toggleBtnOrForm = () => {
    setShowForm(!showFormHideBtn)
  }

  return (
    <div className="App">
      <Header />
      <Pomo />      
      <TaskList />
      {
        (showFormHideBtn) ? <FormAddTask actionToggle={ toggleBtnOrForm } /> : <BtnAddTask actionToggle={ toggleBtnOrForm } /> 
      }
    </div>
  );
}

export default App;
