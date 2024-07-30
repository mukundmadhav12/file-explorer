import React, { useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { useDispatch } from 'react-redux';
import { FaFolder, FaFile, FaEdit, FaTrash } from 'react-icons/fa';
import { selectFile, renameFileOrFolder, deleteFileOrFolder, addFileOrFolder } from '../redux/fileSystemSlice';
import { ItemTypes } from '../DragItemTypes';
import './FileNode.css';

const FileNode = ({ node, moveItem }) => {
  const dispatch = useDispatch();
  const [editingNodeId, setEditingNodeId] = useState(null);
  const [newName, setNewName] = useState('');

  const handleFileClick = () => {
    dispatch(selectFile(node));
  };

  const handleRename = () => {
    dispatch(renameFileOrFolder({ id: node.id, newName }));
    setEditingNodeId(null);
    setNewName('');
  };

  const handleDelete = () => {
    dispatch(deleteFileOrFolder({ id: node.id }));
  };

  const [{ isDragging }, drag] = useDrag({
    type: node.type === 'folder' ? ItemTypes.FOLDER : ItemTypes.FILE,
    item: node,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: [ItemTypes.FILE, ItemTypes.FOLDER],
    drop: (draggedItem) => moveItem(draggedItem, node),
  });

  return (
    <li key={node.id} ref={drag} style={{ opacity: isDragging ? 0.5 : 1 }}>
      <div className="file-node" ref={drop}>
        {node.type === 'folder' ? <FaFolder /> : <FaFile />}
        {editingNodeId === node.id ? (
          <>
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
            />
            <button onClick={handleRename}>Save</button>
          </>
        ) : (
          <>
            <span onClick={handleFileClick}>{node.name}</span>
            <FaEdit onClick={() => setEditingNodeId(node.id)} />
            <FaTrash onClick={handleDelete} />
          </>
        )}
      </div>
      {node.children && (
        <ul>
          {node.children.map((child) => (
            <FileNode key={child.id} node={child} moveItem={moveItem} />
          ))}
        </ul>
      )}
    </li>
  );
};

export default FileNode;
