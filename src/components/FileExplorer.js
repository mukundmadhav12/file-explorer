import React from 'react';
import FileTree from './FileTree';
import FileViewer from './FileViewer';
import './AddFileFolder.css';

const FileExplorer = () => {
  return (
    <div className="file-explorer">
      <FileTree />
      <FileViewer />
    </div>
  );
};

export default FileExplorer;
