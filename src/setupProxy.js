// src/setupProxy.js

const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api', // Đường dẫn API của bạn
    createProxyMiddleware({
      target: 'https://66332f56f7d50bbd9b4872b3.mockapi.io/rooms', // URL của API thật
      changeOrigin: true,
    })
  );
};
