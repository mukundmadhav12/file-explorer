import React from 'react';
import { useSelector } from 'react-redux';
import './FileViewer.css';

const FileViewer = () => {
  const selectedFile = useSelector((state) => state.fileSystem.selectedFile);

  if (!selectedFile) {
    return <div className="file-viewer">Select a file to view its contents</div>;
  }

  return (
    <div className="file-viewer">
      <h3>{selectedFile.name}</h3>
      <pre>{selectedFile.content}</pre>
    </div>
  );
};

export default FileViewer;
