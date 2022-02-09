// Main starting point of the application
import express from 'express';
import session from 'cookie-session';
import http from 'http';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import router from './routes';
import mongoose from 'mongoose';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import csurf from 'csurf';
import hpp from 'hpp';
import {timeSetting} from './config/config';
const app = express();
app.use(helmet());
app.use(hpp());

// app.use(
//     session({
//       secret: timeSetting.secret,
//       resave: false,
//       saveUninitialized: true,
//       cookie: { secure: true }
//     })
//   );

// app.use(csurf());
app.use(cookieParser());
// app.use(csurf({
//   cookie: {
//     key: '_csrf-my-app',
//     path: '/context-route',
//     httpOnly: true,
//     secure: process.env.NODE_ENV === 'production',
//     maxAge: 3600 // 1-hour
//   }
// }));
// DB Setup
mongoose.connect('mongodb://127.0.0.1:27017/marchtech');

// App Setup
app.use(morgan('combined'));
app.use(bodyParser.json({ type: '*/*' }));

// Allow cross-origin resource sharing
app.use(cors());
// app.get('/getCSRFToken', (req, res) => {
//     res.json({ CSRFToken: req.csrfToken() });
// });
app.use(router);

app.options('*', cors());

// Application Routes
// router(app);

// Server Setup
const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port);
