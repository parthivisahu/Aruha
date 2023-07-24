import React, { useState } from 'react';
import "./Header.css";
import SearchIcon from '@mui/icons-material/Search';
import { Avatar } from '@mui/material';
import { useDataLayerValue } from "../DataLayer";

function Header() {
  const [{ user },] = useDataLayerValue();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Perform search action using the searchQuery value
    console.log("Search query:", searchQuery);
  };

  return (
    <div className='header'>
      <div className='header__left'>
        <SearchIcon />
        <form onSubmit={handleSearchSubmit}>
          <input
            placeholder='Search for Artists or Songs'
            type='text'
            value={searchQuery}
            onChange={handleSearchInputChange}
          />
        </form>
      </div>
      <div className='header__right'>
        <Avatar src={user?.images[0]?.url} alt={user?.display_name} />
        <h4>{user?.display_name}</h4>
      </div>
    </div>
  )
}

export default Header;
