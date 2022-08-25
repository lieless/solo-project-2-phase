import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './Navbar';
import Login from './Login';
import Registration from './Registration';
import Main from './Main';

function App({ userSession }) {
  const [authState, setAuthState] = useState(userSession || null);
  console.log(authState);
  const [searchState, setSearchState] = useState(true);
  return (
    <>
      <Navbar authState={authState} setAuthState={setAuthState} searchState={searchState} />
      <Routes>
        <Route path="/" element={<Main authState={authState} setSearchState={setSearchState} />} />
        <Route path="/login" element={<Login setAuthState={setAuthState} setSearchState={setSearchState} />} />
        <Route path="/registration" element={<Registration setAuthState={setAuthState} setSearchState={setSearchState} />} />
      </Routes>
    </>
  );
}

export default App;
