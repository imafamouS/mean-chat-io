import Express from 'express';
import Dotenv from 'dotenv';
import BodyParse from 'body-parser';
import CookieParser from 'cookie-parser';
import Logger from 'morgan';
import Path from 'path';

import Config from '../config/config';
import Routes from '../routes/main.route';


const app = Express();
app.use(BodyParse.json());
app.use(BodyParse.urlencoded({ extended: false }));
app.use(CookieParser());
app.set('port', (Config.port || 3000));
app.use('/api', Routes);

if (Config.env === 'development') {
    app.use(Logger("dev"));
}

app.use('/', Express.static(Path.join(__dirname, '../../dist/public')));
app.get('/*', function(req, res) {
    res.sendFile(Path.join(__dirname, '../../dist/public/index.html'));
});

export default app;
