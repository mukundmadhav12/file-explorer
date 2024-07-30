import React from 'react';
import { useDispatch } from 'react-redux';
import { setSearchQuery } from '../redux/fileSystemSlice';
import './SearchBar.css';

const SearchBar = () => {
  const dispatch = useDispatch();

  const handleSearchChange = (event) => {
    dispatch(setSearchQuery(event.target.value));
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search files and folders..."
        onChange={handleSearchChange}
      />
    </div>
  );
};

export default SearchBar;
