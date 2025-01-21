import express from 'express';
import connectDB from './database/connection';
import routes from './routes';
import { exampleMiddleware } from './middleware/exampleMiddleware';

const app = express();

app.use(express.json());
app.use(exampleMiddleware);
app.use('/api', routes);

connectDB();

export default app;
