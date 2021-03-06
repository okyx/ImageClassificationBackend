const Hapi = require('@hapi/hapi');
const predict = require('../../interfaces/api/predictImage');
const createServer = async(container) => {
  const server = Hapi.server({
    host: process.env.HOST,
    port: process.env.PORT,
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });
  await server.register([
    {
      plugin: predict,
      options: {container},
    }
  ]);
  server.ext('onPreResponse', (request, h) => {
    // mendapatkan konteks response dari request
    const { response } = request;

    if (response instanceof Error) {
      // bila response tersebut error, tangani sesuai kebutuhan

      // penanganan server error sesuai kebutuhan
      const newResponse = h.response({
        status: 'error',
        message: response.message,
      });
      newResponse.code(400);
      return newResponse;
    }

    // jika bukan error, lanjutkan dengan response sebelumnya (tanpa terintervensi)
    return h.continue;
  });
  return server;
}
module.exports = createServer;