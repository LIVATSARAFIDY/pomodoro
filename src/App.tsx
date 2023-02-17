import React, {useEffect ,useState } from 'react';
import Pomo from './features/pomo/Pomo';
import Header from './features/header/Header';
import './App.css';
import TaskList from './features/tasks/TaskList';
import BtnAddTask from './features/tasks/BtnAddTask';
import FormAddTask from './features/tasks/FormAddTask';
import RecapPomo from './features/footer/RecapPomo';
import Settings from './features/modalSettings/Settings';

const App:React.FC = () => {

  const [showFormHideBtn,setShowForm] = useState<boolean>(false)
  const [showModalForSettings,setShowModalForSettings] = useState<boolean>(false)
  const toggleBtnOrForm = () => {
    setShowForm(!showFormHideBtn)
  }
  const showOrHideModal = () =>{
    setShowModalForSettings(true)
  }

  return (
    <div className="App">
      <Header activeModal={ showOrHideModal } />
      { showModalForSettings ? <Settings desactiveModal={ () => setShowModalForSettings(false) } /> : <></>}
      <Pomo />      
      <TaskList />
      {
        (showFormHideBtn) ? <FormAddTask actionToggle={ toggleBtnOrForm } /> : <BtnAddTask actionToggle={ toggleBtnOrForm } /> 
      }
      <RecapPomo />
    </div>
  );
}

export default App;
