import express, { Application } from 'express';
import { join } from 'path';
import { renderHome } from './routes';

const app: Application = express();

app.use('/', express.static(join(__dirname, '../../static')));
app.set('view engine', 'ejs');
app.set('port', process.env.PORT || 3000);

app.get('/', renderHome);

export default app;
