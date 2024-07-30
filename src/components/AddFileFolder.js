import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addFileOrFolder } from '../redux/fileSystemSlice';
import './AddFileFolder.css';

const AddFileFolder = () => {
  const [name, setName] = useState('');
  const [type, setType] = useState('file');
  const [parentId, setParentId] = useState('root');
  const [error, setError] = useState('');
  const dispatch = useDispatch();

  const handleAdd = () => {
    if (!name) {
      setError('Name is required');
      return;
    }

    const newItem = {
      id: `${parentId}-${Date.now()}`,
      name,
      type,
      children: type === 'folder' ? [] : undefined,
    };
    dispatch(addFileOrFolder({ parentId, newItem }));
    setName('');
    setError('');
  };

  return (
    <div className="add-file-folder">
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <select value={type} onChange={(e) => setType(e.target.value)}>
        <option value="file">File</option>
        <option value="folder">Folder</option>
      </select>
      <button onClick={handleAdd}>Add</button>
      {error && <div className="error">{error}</div>}
    </div>
  );
};

export default AddFileFolder;
