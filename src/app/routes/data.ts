import { Request, Response } from 'express';
import { getLatest } from '../getData';

export const data = async (req: Request, res: Response): Promise<void> => {
  const data = await getLatest();
  res.json(data);
};
