import { Request, Response } from 'express';
import { getLatest } from '../db';

export const renderHome = async (req: Request, res: Response): Promise<void> => {
  const data = await getLatest();

  res.render('home', data);
};
