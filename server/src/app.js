import '../env';
import express from 'express';
import cors from 'cors';
import server from './server';

const app = express();

app.use(cors());
app.use('/graphql', server);

app.listen(4001, () => console.log('run'));
