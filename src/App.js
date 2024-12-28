import Homepage from './Todolist/Homepage'
import './App.css';
import Dummy from './Dummy';
import { useState } from 'react';
import Demo from './Todolist/Demo';
function App() {

  let [view, setView] = useState(false);
  return (
    <div className="App">
      <Homepage/> 

      {/* <button onClick={() => setView(true)}>VIEWS</button>
      <Demo setView={setView} />

      {
        view && <Dummy />
      } */}



    </div>
  );
}

export default App;
