import React, { useEffect, useState } from 'react';
import Form from './Form';

function Main({ authState, setSearchState }) {
  const [urls, setUrls] = useState([]);
  const [loader, setLoader] = useState(false);
  useEffect(() => {
    setSearchState(false);
  }, []);

  return (
    <div className="main_container">
      <div className="container">
        <Form setUrls={setUrls} setLoader={setLoader} />
      </div>
      {loader && (
      <div className="spinnerContainer">
        <img className="spinner" src="stylesheets/images/dv.png" alt="" />
      </div>
      ) }
      <div className="cameras_container">
        {urls.map((url) => (
          <iframe src={url} width="350" height="350">
            Ваш браузер не поддерживает плавающие фреймы!
          </iframe>
        ))}
      </div>

      {/* <iframe src="https://webcams.windy.com/webcams/public/embed/player/1010434642/day" width="500" height="500" align="left">
        Ваш браузер не поддерживает плавающие фреймы!
      </iframe> */}
    </div>
  );
}

export default Main;
