import errorHandler from 'errorhandler';

import app from './app';

if (app.get('env') == 'development') {
  app.use(errorHandler());
}

const server = app.listen(app.get('port'), () => {
  console.log('Server is running at :%d', app.get('port'));
});

export default server;
