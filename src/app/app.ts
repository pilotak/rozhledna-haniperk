import express, { Application } from 'express';
import favicon from 'serve-favicon';
import { join } from 'path';
import { renderHome, status, data } from './routes';

const app: Application = express();

app.use(favicon(join(__dirname, '../../static', 'favicon', 'favicon.ico')));
app.use('/', express.static(join(__dirname, '../../static')));
app.set('views', join(__dirname, '../../views'));
app.set('view engine', 'ejs');
app.set('port', process.env.PORT || 3000);

app.get('/', renderHome);
app.get('/status', status);
app.get('/data', data);

export default app;
