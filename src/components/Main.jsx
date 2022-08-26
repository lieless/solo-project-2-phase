import React, { useEffect, useState } from 'react';
import Form from './Form';

function Main({ authState, setSearchState }) {
  const [urls, setUrls] = useState([]);
  const [period, setPeriod] = useState('');
  useEffect(() => {
    setSearchState(false);
  }, []);

  return (
    <div className="cameras_container">
      <Form setUrls={setUrls} setPeriod={setPeriod} />
      {urls.map((url) => (
        <iframe src={url} width="250" height="250">
          Ваш браузер не поддерживает плавающие фреймы!
        </iframe>
      ))}
      {/* <iframe src="https://webcams.windy.com/webcams/public/embed/player/1010434642/day" width="500" height="500" align="left">
        Ваш браузер не поддерживает плавающие фреймы!
      </iframe> */}
    </div>
  );
}

export default Main;
