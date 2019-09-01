import { Injectable, Logger } from '@nestjs/common';
import { ValidationError } from 'class-validator';
import { type } from 'os';
import { ValidationErrors } from './error.interfaces';
import { Error as ErrorResponse } from '../../graphql.schema';

@Injectable()
export class ErrorHandler {
  constructor() {}

  public checkForValidationErrors(errors: ValidationError[]) {
    if (!errors || !errors.length) {
      return;
    }

    throw new ValidationErrors(errors);
  }

  public formatError(err): ErrorResponse[] {
    if (err instanceof ValidationErrors) {
      const errors: ErrorResponse[] = [];

      err.errors.forEach(({ property, constraints }) => {
        for (let key in constraints) {
          errors.push({
            path: property,
            message: constraints[key],
          });
        }
      });
      return errors;
    }
    return [{
        path: 'name',
        message: 'something went wrong'
    }]
  }
}
