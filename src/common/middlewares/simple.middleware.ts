import { NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

export class simpleMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    //finish requisition
    return res.status(404).send({
      message: 'Not find',
    });
    //throw new Error('Method not implemented.');
  }
}
