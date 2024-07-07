import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import logger from './logger';
import { NODE_ENV, PORT } from './config';

const app = express();
app.use(helmet());
app.use(cors());
app.use(bodyParser.json());
app.use(morgan('combined', { stream: { write: message => logger.info(message.trim()) } }));

interface Animal {
    name: string;
}

let animals: Animal[] = [];

app.get('/api/animals', (req, res) => {
    res.json(animals);
});

app.post('/api/animals', (req, res) => {
    const { name } = req.body;

    if (!name || typeof name !== 'string') {
        return res.status(400).json({ error: 'Invalid animal name.' });
    }

    const isDuplicate = animals.some(animal => animal.name === name);

    if (isDuplicate) {
        return res.status(400).json({ error: 'Animal name must be unique.' });
    }

    const newAnimal: Animal = { name };
    animals.push(newAnimal);

    res.status(201).json(newAnimal);
});

app.delete('/api/animals/:name', (req, res) => {
    const { name } = req.params;
    animals = animals.filter(animal => animal.name !== name);
    res.status(204).end();
});

app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    logger.error(err.stack);
    res.status(500).send('Something went wrong!');
});

app.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT} in ${NODE_ENV} mode`);
});
