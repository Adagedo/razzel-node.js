import express from 'express';

let app = require('./server').default;

if (module.hot) {
  module.hot.accept('./server', () => {
    console.log('🔁  HMR Reloading `./server`...');
    try {
      app = require('./server').default;
    } catch (error) {
      console.error(error);
    }
  });
  console.info('✅  Server-side HMR Enabled!');
}

const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

export default app.then(theapp=>{
  express()
  .use((req, res) => theapp.handle(req, res))
  .listen(port, () => {
    console.log(`> App started http://localhost:${port}`)
    console.log(`> Graphql at http://localhost:${port}/graphql`)
  });
});
