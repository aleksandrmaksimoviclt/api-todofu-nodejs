import http from 'http';
import express from 'express';
import morgan from 'morgan';
import config from './config.json';

let app = express();
app.server = http.createServer(app);

// logger
app.use(morgan('dev'));

app.server.listen(process.env.PORT || config.port, () => {
});


export default app;
