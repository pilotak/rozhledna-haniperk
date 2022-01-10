import { Request, Response } from 'express';

export const status = async (req: Request, res: Response): Promise<void> => {
  res.json({
    status: 'OK',
  });
};
