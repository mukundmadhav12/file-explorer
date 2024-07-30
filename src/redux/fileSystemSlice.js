import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  fileSystem: {
    id: 'root',
    name: 'root',
    type: 'folder',
    children: [],
  },
  selectedFile: null,
};

const fileSystemSlice = createSlice({
  name: 'fileSystem',
  initialState,
  reducers: {
    setFileSystem: (state, action) => {
      state.fileSystem = action.payload;
    },
    selectFile: (state, action) => {
      state.selectedFile = action.payload;
    },
    addFileOrFolder: (state, action) => {
      const { parentId, newItem } = action.payload;
      const findAndAdd = (node) => {
        if (node.id === parentId) {
          node.children.push(newItem);
        } else if (node.children) {
          node.children.forEach(findAndAdd);
        }
      };
      findAndAdd(state.fileSystem);
    },
    renameFileOrFolder: (state, action) => {
      const { id, newName } = action.payload;
      const findAndRename = (node) => {
        if (node.id === id) {
          node.name = newName;
        } else if (node.children) {
          node.children.forEach(findAndRename);
        }
      };
      findAndRename(state.fileSystem);
    },
    deleteFileOrFolder: (state, action) => {
      const { id } = action.payload;
      const deleteRecursively = (node, parent) => {
        if (node.id === id) {
          if (parent) {
            parent.children = parent.children.filter(child => child.id !== id);
          } else {
            state.fileSystem = null;
          }
        } else if (node.children) {
          node.children.forEach(child => deleteRecursively(child, node));
        }
      };
      deleteRecursively(state.fileSystem, null);
    },
  }
});

export const { setFileSystem, selectFile, addFileOrFolder, renameFileOrFolder, deleteFileOrFolder } = fileSystemSlice.actions;
export default fileSystemSlice.reducer;
