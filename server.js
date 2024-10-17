import express from 'express';
import controllerRouting from './routes/index';
import redisClient from './utils/redis';

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

controllerRouting(app);

app.get('/', (req, res) => {
  res.send ('Welcome to the file manager api');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

export default app;
