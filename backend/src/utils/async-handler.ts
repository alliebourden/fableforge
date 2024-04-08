import { type Request, type Response, type NextFunction } from 'express'

export const asyncHandler = (asyncFn: (req: Request, res: Response) => Promise<Response> | Promise<void>) => {
  return function (req: Request, res: Response, next: NextFunction) {
    asyncFn(req, res).catch(next)
  }
}
