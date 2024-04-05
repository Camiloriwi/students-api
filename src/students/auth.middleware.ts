import { Injectable, NestMiddleware } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Request, Response, NextFunction } from 'express';
// import { PasswordEncryptionMiddleware } from './password-encryption.middleware';
// @Injectable()
// export class AuthMiddleware implements NestMiddleware {
//   use(req: any, res: any, next: () => void) {
//     next();
//   }
// }


@Injectable()
export class PasswordEncryptionMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    const password = req.body.password;
    const saltOrRounds = 10;
    req.body.password = await bcrypt.hash(password, saltOrRounds);
    next();
  }
}
