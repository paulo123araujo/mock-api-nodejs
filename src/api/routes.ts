import fs from 'node:fs';
import { join } from 'node:path';
import { EOL } from 'node:os';
import { Request, Response, Router } from 'express';
import logger from '@/infra/logger/pino';
import { env } from '@/env';

const app = Router();

app.get('/health', (_req: Request, res: Response) => {
  return res.json({ ok: true });
});

app.post('/:path', async (req: Request, res: Response) => {
  const { path } = req.params;
  const data = req.body;

  try {
    const stream = fs.createWriteStream(
      join(env.DIR_NAME, '..', 'data', `${path}.json`),
      {
        flags: 'a',
      },
    );
    stream.write(JSON.stringify(data) + EOL, 'utf8');

    stream.end();
    return res.status(204).send();
  } catch (err) {
    logger.error(err, 'Error on upload to file', 'VLD');
    return res.status(500).send('Internal Server Error');
  }
});

app.get('/:path', async (req: Request, res: Response) => {
  const { path } = req.params;

  const data: Array<any> = [];

  try {
    const stream = fs.createReadStream(
      join(env.DIR_NAME, '..', 'data', `${path}.json`),
    );

    stream.on('data', (chunk) => {
      data.push(JSON.parse(chunk.toString()));
    });

    stream.on('end', () => {
      res.status(200).json(data);
    });
  } catch (err) {
    logger.error(err, 'Error on read json', 'VLD');
    return res.status(500).send('Internal Server Error');
  }
});

export default app;
