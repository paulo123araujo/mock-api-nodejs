import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import 'express-async-errors';
import routes from './routes';

const api = express();

api.use(express.json());
api.use(express.urlencoded({ extended: true }));
api.use(cors());
api.use(helmet());

api.use(routes);

export { api };
