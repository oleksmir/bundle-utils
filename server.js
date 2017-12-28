/* eslint no-console: 0 */

const path = require('path');
const express = require('express');
const webpack = require('webpack');
const fs = require('fs');
const webpackMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('./webpack.config.js');
const useragent = require('express-useragent');
const { getBundleIdByUseragent } = require('./utils/get-bundle');


const isDeveloping = process.env.NODE_ENV !== 'production';
const port = isDeveloping ? 3000 : process.env.PORT;
const app = express();
app.use(useragent.express());

if (isDeveloping) {
  app.get('*', function response(req, res) {
    let url = req.url;
    if (!url || url === '/') url = 'index.html';
    if (url === '/favicon.ico') {
      res.end();
      return;
    }
    const bundleId = getBundleIdByUseragent(req.useragent);
    const fullPath = path.join(__dirname, 'dist', bundleId, url)
    console.log(fullPath);
    res.write(fs.readFileSync(path.join(fullPath)));
    res.end();
  });
} else {
  app.use(express.static(__dirname + '/dist'));
  app.get('*', function response(req, res) {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
  });
}

app.listen(port, '0.0.0.0', function onStart(err) {
  if (err) {
    console.log(err);
  }
  console.info('==> 🌎 Listening on port %s. Open up http://0.0.0.0:%s/ in your browser.', port, port);
});