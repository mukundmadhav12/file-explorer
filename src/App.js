import React from 'react';
import FileExplorer from './components/FileExplorer';
import AddFileFolder from './components/AddFileFolder';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>File Explorer</h1>
      </header>
      <main>
        <AddFileFolder />
        <FileExplorer />
      </main>
    </div>
  );
}

export default App;
