import http from 'http';
import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import config from './server/config/config';

import routes from './server/routes'


let app = express();

app.server = http.createServer(app);

mongoose.connect(config.db, {
  useMongoClient: true
});

mongoose.connection.on('error', () => {
  throw new Error(`unable to connect to database: ${config.db}`);
});

mongoose.connection.on('connected', () => {
  console.log(`Connected to database: ${config.db}`);
});

if (config.env === 'development') {
  mongoose.set('debug', true);
}

app.use('/api', routes);

app.use(morgan('dev'));


app.server.listen(process.env.PORT || config.port, () => {
  console.log(`API Server started and listening on port ${config.port} (${config.env})`);
});



export default app;
