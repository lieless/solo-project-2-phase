import express from 'express';
import morgan from 'morgan';
import session from 'express-session';
import sessionConf from './sessionConfig';
import apiAuthRoute from '../routes/api/apiAuth';
import apiRoute from '../routes/api/apiRoute';
import renderRoute from '../routes/render/renderRoute';

const serverConfig = (app) => {
  const sessionConfig = sessionConf;

  app.use(express.static('public'));
  app.use(express.json());
  app.use(morgan('dev'));
  app.use(session(sessionConfig));

  app.use('/api/auth', apiAuthRoute);
  app.use('/api', apiRoute);
  app.use('/', renderRoute);
};

export default serverConfig;
