import { Request, Response, NextFunction } from "express";

function handleJsonError(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof SyntaxError) {
    console.error(JSON.stringify(err));
    res.status(400).json({ message: 'Invalid JSON' });
  } else {
    next(err);
  }
}

export default handleJsonError;