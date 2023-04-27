import React from 'react';
import './App.css';
import Header from './components/Header';
import Main from './components/Main';

declare global {
    namespace Express {
      interface Request {
        context: any
      }
    }
  }

function App() {
  return (
      <div className="App">
        
        <div className="min-h-full">
          <Header/>
          <Main>
            
          </Main>
        </div>

      </div>
  );
}

export default App;
