import { NextFunction, Request, Response } from 'express';

function isValidDate(d: Date) {
  // @ts-ignore
  return d instanceof Date && !isNaN(d); // eslint-disable-line
}

export default function validStockDate(req: Request, res: Response, next: NextFunction): void {
  if (req.body?.startDate === undefined && req.body?.endDate === undefined) {
    next();
    return;
  }
  const startDate = new Date(req.body.startDate);
  const endDate = new Date(req.body.endDate);

  if (!isValidDate(startDate) || !isValidDate(endDate)) {
    res.status(400);
    res.json({ errorMessage: 'Invalid inputs for either startDate or endDate' });
    res.end();
    return;
  }

  if (startDate > endDate) {
    res.status(400);
    res.json({ errorMessage: 'Start date cannot be after end date.' });
    res.end();
    return;
  }

  const numOfDays = (endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24);
  if (numOfDays > 300) {
    res.status(400);
    res.json({ errorMessage: 'Difference between startDate and endDate must be less than 300.' });
    res.end();
    return;
  }

  req.body.startDate = startDate;
  req.body.endDate = endDate;
  next();
}
