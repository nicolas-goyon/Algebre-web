import React from 'react';
import './App.css';
import Header from './components/Header';
import Main from './components/Main';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';



function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="App">
        
        <div className="min-h-full">
          <Header/>
          <Main>
            
          </Main>
        </div>

      </div>
    </DndProvider>
  );
}

export default App;
