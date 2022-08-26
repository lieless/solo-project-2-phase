import React from 'react';
import axios from 'axios';

function Form({ setUrls, setPeriod }) {
  const submitHandler = async (e) => {
    e.preventDefault();
    const { region, period } = Object.fromEntries(new FormData(e.target));
    const regions = await fetch('/api/regions');
    // const regions = await fetch('https://api.windy.com/api/webcams/v2/list?show=regions', {
    //   method: 'GET',
    //   headers: { 'x-windy-key': 'X5JC9IQvqgVa8BzQGMouMi6GeGjCYIMN' },
    // });
    const dataRegions = await regions.json();
    console.log(dataRegions);
    const targetRegion = dataRegions.result.regions.filter((el) => el.name.toLowerCase() === region.toLowerCase());
    const targetId = targetRegion[0].id;
    const response = await fetch(`/api/regions/${targetId}`);
    // const response = await fetch(`https://api.windy.com/api/webcams/v2/list?region=${targetId}&show=webcams:player`, {
    //   method: 'GET',
    //   headers: { 'x-windy-key': 'X5JC9IQvqgVa8BzQGMouMi6GeGjCYIMN' },
    // });
    const data = await response.json();
    const camsArr = data.result.webcams.map((el) => {
      if (el.player[period].available) {
        return el.player[period].embed;
      }
    });
    // const camsArr = data.result.webcams;
    console.log(camsArr);
    setUrls(camsArr);
    setPeriod(period);
  };
  return (
    <div>
      <form onSubmit={submitHandler}>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Регион</label>
          <input name="region" type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Введите название региона" />
        </div>
        <select name="period" defaultValue="lifetime" className="form-select" aria-label="Default select example">
          <option>Выберите период записи видео с камер интересующего региона</option>
          <option value="day">День</option>
          <option value="month">Меясц</option>
          <option value="year">Год</option>
          <option value="lifetime">Вся продолжительность жизни камеры</option>
          <option value="live">Режим Live *есть не на всех камерах*</option>
        </select>
        <button type="submit" className="btn btn-primary">Найти</button>
      </form>
    </div>
  );
}

export default Form;
