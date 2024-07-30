import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import fileSystemReducer, { setFileSystem } from './redux/fileSystemSlice';
import App from './App';

const store = configureStore({
  reducer: {
    fileSystem: fileSystemReducer,
  },
});

const initialFileSystem = {
  id: 'root',
  name: 'root',
  type: 'folder',
  children: [
    { id: 'file1', name: 'File 1', type: 'file', content: 'Content of File 1' },
    { id: 'folder1', name: 'Folder 1', type: 'folder', children: [] },
  ],
};

store.dispatch(setFileSystem(initialFileSystem));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
