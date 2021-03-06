const routes = (handler) => [
  {
    method: 'POST',
    path: '/predict',
    handler: handler.postPredictImage,
    options: {
      payload: {
        allow: 'multipart/form-data',
        multipart: true,
        output: 'stream',
        maxBytes: 512000,
      }
    }
  },
  {
    method: 'GET',
    path: '/',
    handler: ()=> {
      return {
        status:'success',
      };
    },
  }
];

module.exports = routes;