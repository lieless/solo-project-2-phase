import React from 'react';
import { StaticRouter } from 'react-router-dom/server';
import App from './App';

function Layout({ initState }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" href="stylesheets/index.css" />
        <link rel="stylesheet" href="stylesheets/bootstrap.min.css" />
        <script dangerouslySetInnerHTML={{ __html: `window.initState=${JSON.stringify(initState)}` }} />
        {/* Было раньше - <script defer>window.initState={{{initState}}}</script> */}
        <script defer src="/app.js" />
        <script defer src="/vendor.js" />
        <title>Document</title>
      </head>
      <body>
        <div id="root">
          <StaticRouter location={initState.path}>
            <App {...initState} />
          </StaticRouter>
        </div>
      </body>
    </html>
  );
}

export default Layout;
