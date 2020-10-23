import { Request, Response } from 'express';

export const healthcheck = async (req: Request, res: Response): Promise<void> => {
  const healthcheck = {
    uptime: process.uptime(),
    message: 'OK',
    timestamp: Date.now(),
  };

  res.send(healthcheck);
};
