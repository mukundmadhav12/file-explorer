import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectFile, renameFileOrFolder, deleteFileOrFolder } from '../redux/fileSystemSlice';
import { FaFolder, FaFile, FaEdit, FaTrash } from 'react-icons/fa';
import './FileTree.css';

const FileTree = () => {
  const dispatch = useDispatch();
  const fileSystem = useSelector((state) => state.fileSystem.fileSystem);
  const [editingNodeId, setEditingNodeId] = useState(null);
  const [newName, setNewName] = useState('');

  const handleFileClick = (file) => {
    dispatch(selectFile(file));
  };

  const handleRename = (node) => {
    dispatch(renameFileOrFolder({ id: node.id, newName }));
    setEditingNodeId(null);
    setNewName('');
  };

  const handleDelete = (node) => {
    dispatch(deleteFileOrFolder({ id: node.id }));
  };

  const renderTree = (node) => {
    return (
      <li key={node.id}>
        <div className="file-node">
          {node.type === 'folder' ? <FaFolder /> : <FaFile />}
          {editingNodeId === node.id ? (
            <>
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
              />
              <button onClick={() => handleRename(node)}>Save</button>
            </>
          ) : (
            <>
              <span onClick={() => handleFileClick(node)}>{node.name}</span>
              <FaEdit onClick={() => setEditingNodeId(node.id)} />
              <FaTrash onClick={() => handleDelete(node)} />
            </>
          )}
        </div>
        {node.children && (
          <ul>
            {node.children.map((child) => renderTree(child))}
          </ul>
        )}
      </li>
    );
  };

  return (
    <div className="file-tree">
      <ul>{renderTree(fileSystem)}</ul>
    </div>
  );
};

export default FileTree;
