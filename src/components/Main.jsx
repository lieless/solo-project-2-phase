import React, { useEffect, useState } from 'react';

function Main({ authState, setSearchState }) {
  useEffect(() => {
    setSearchState(true);
  }, []);

  return (
    <div>
	Main page
    </div>
  );
}

export default Main;
