import express from 'express';

const route = express.Router();

route.get('/regions', async (req, res) => {
  const regions = await fetch('https://api.windy.com/api/webcams/v2/list?show=regions', {
    method: 'GET',
    headers: { 'x-windy-key': process.env.API_KEY },
  });
  const dataRegions = await regions.json();
  console.log(dataRegions);
  res.json(dataRegions);
});

route.get('/regions/:id', async (req, res) => {
  const { id } = req.params;
  const response = await fetch(`https://api.windy.com/api/webcams/v2/list?region=${id}&show=webcams:player`, {
    method: 'GET',
    headers: { 'x-windy-key': process.env.API_KEY },
  });
  const dataResponse = await response.json();
  res.json(dataResponse);
});

export default route;
