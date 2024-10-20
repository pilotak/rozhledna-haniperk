import express, { Application } from 'express';
import favicon from 'serve-favicon';
import { join } from 'path';
import { renderHome, status, data } from './routes';
import env from './env';

const app: Application = express();

app.use(favicon(join(__dirname, '../../static', 'favicon', 'favicon.ico')));
app.use('/', express.static(join(__dirname, '../../static')));
app.disable('x-powered-by');
app.set('views', join(__dirname, '../../views'));
app.set('view engine', 'ejs');
app.set('port', env.PORT);

app.get('/', renderHome);
app.get('/status', status);
app.get('/data', data);

export default app;
