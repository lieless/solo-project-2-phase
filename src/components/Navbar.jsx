/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

function Navbar({ authState, setAuthState, searchState }) {
  const navigate = useNavigate();
  const [input, setInput] = useState('');

  const inputHandler = (e) => {
    setInput(e.target.value);
  };

  const searchHandler = (e) => {
    e.preventDefault();
  };

  const logoutHandler = async (e) => {
    e.preventDefault();
    const response = await fetch('/api/auth/logout');
    if (response.ok) {
      setAuthState(null);
      navigate('/');
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse container" id="navbarTogglerDemo01">
        <NavLink to="/" className="navbar-brand">Какой-то сайт</NavLink>
        <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
          <li className="nav-item active"><NavLink to="/" className="nav-link">Главная</NavLink></li>
          {authState
            ? (
              <>
                <li className="nav-item active"><p className="nav-link">{`Привет, ${authState.name}`}</p></li>
                <li className="nav-item active"><button type="button" id="exit" onClick={logoutHandler} className="nav-link">Выход</button></li>
              </>
            )
            : (
              <>
                <li className="nav-item active"><NavLink to="/registration" className="nav-link">Регистрация</NavLink></li>
                <li className="nav-item active"><NavLink to="/login" className="nav-link">Вход</NavLink></li>
              </>
            )}
        </ul>
        {searchState && (
        <form onSubmit={searchHandler} className="form-inline my-2 my-lg-0 form">
          <input onChange={inputHandler} value={input} className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
          <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
        </form>
        )}
      </div>
    </nav>
  );
}

export default Navbar;

